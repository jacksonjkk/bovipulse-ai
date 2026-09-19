import { z } from "zod";
import { asyncHandler } from "../lib/asyncHandler.js";
import { HttpError } from "../lib/httpError.js";
import { prisma } from "../lib/prisma.js";
import { requireFarm } from "../lib/farmScope.js";
import { env } from "../config/env.js";
import { getPagination, paginated } from "../lib/pagination.js";
import { createAlert } from "../services/alert.service.js";

const DAY_MS = 86_400_000;

const readingSchema = z.object({
  cattleId: z.string().min(1),
  temperatureC: z.number().min(25).max(45),
  ambientC: z.number().min(-40).max(60).nullish(),
  capturedAt: z.coerce.date().optional(),
  imageUrl: z.url().max(300).nullish(),
});

function classifyTemperature(temperatureC) {
  if (temperatureC >= env.feverThresholdC + 0.8) {
    return { anomaly: true, riskLevel: "CRITICAL", condition: "critical fever" };
  }
  if (temperatureC >= env.feverThresholdC) {
    return { anomaly: true, riskLevel: "HIGH", condition: "fever" };
  }
  if (temperatureC < 37.0) {
    return { anomaly: true, riskLevel: "MEDIUM", condition: "abnormally low temperature" };
  }
  return { anomaly: false, riskLevel: "LOW", condition: "normal" };
}

export const createReading = asyncHandler(async (req, res) => {
  const farm = await requireFarm(req.user);
  const data = readingSchema.parse(req.body);

  const cattle = await prisma.cattle.findFirst({
    where: { id: data.cattleId, farmId: farm.id },
  });
  if (!cattle) throw new HttpError(404, "Cattle not found in your farm");

  const classification = classifyTemperature(data.temperatureC);

  const reading = await prisma.thermalReading.create({
    data: {
      cattleId: cattle.id,
      temperatureC: data.temperatureC,
      ambientC: data.ambientC ?? null,
      imageUrl: data.imageUrl ?? null,
      capturedAt: data.capturedAt ?? new Date(),
      anomaly: classification.anomaly,
      riskLevel: classification.riskLevel,
    },
  });

  let alertCreated = false;
  if (classification.anomaly) {
    await createAlert({
      farmId: farm.id,
      cattleId: cattle.id,
      type: "HEALTH",
      severity: classification.riskLevel === "MEDIUM" ? "MEDIUM" : classification.riskLevel,
      title: `Thermal ${classification.condition} detected · ${cattle.tagNumber}`,
      message: `${cattle.name ?? cattle.tagNumber} recorded a body temperature of ${data.temperatureC}°C.`,
    });
    alertCreated = true;

    if (cattle.healthStatus === "HEALTHY") {
      await prisma.cattle.update({
        where: { id: cattle.id },
        data: { healthStatus: "SICK" },
      });
    }
  }

  res.status(201).json({ ...reading, classification, alertCreated });
});

export const listReadings = asyncHandler(async (req, res) => {
  const farm = await requireFarm(req.user);
  const { page, limit, skip, take } = getPagination(req.query);

  const where = { cattle: { farmId: farm.id } };
  if (typeof req.query.cattleId === "string" && req.query.cattleId) {
    where.cattleId = req.query.cattleId;
  }
  if (String(req.query.anomalyOnly ?? "") === "true") {
    where.anomaly = true;
  }
  const days = Math.min(Math.max(Number.parseInt(String(req.query.days ?? "7"), 10) || 7, 1), 90);
  where.capturedAt = { gte: new Date(Date.now() - days * DAY_MS) };

  const [total, rows] = await Promise.all([
    prisma.thermalReading.count({ where }),
    prisma.thermalReading.findMany({
      where,
      orderBy: { capturedAt: "desc" },
      skip,
      take,
      include: { cattle: { select: { id: true, tagNumber: true, name: true, photoUrl: true } } },
    }),
  ]);

  res.json(paginated(rows, total, page, limit));
});

export const getSummary = asyncHandler(async (req, res) => {
  const farm = await requireFarm(req.user);

  const days = Math.min(Math.max(Number.parseInt(String(req.query.days ?? "7"), 10) || 7, 1), 90);
  const since = new Date(Date.now() - days * DAY_MS);

  const where = { cattle: { farmId: farm.id }, capturedAt: { gte: since } };
  if (typeof req.query.cattleId === "string" && req.query.cattleId) {
    const cattle = await prisma.cattle.findFirst({
      where: { id: req.query.cattleId, farmId: farm.id },
    });
    if (!cattle) throw new HttpError(404, "Cattle not found in your farm");
    where.cattleId = cattle.id;
  }

  const [aggregate, anomalyCount] = await Promise.all([
    prisma.thermalReading.aggregate({
      where,
      _avg: { temperatureC: true },
      _min: { temperatureC: true },
      _max: { temperatureC: true },
      _count: { _all: true },
    }),
    prisma.thermalReading.count({ where: { ...where, anomaly: true } }),
  ]);

  res.json({
    periodDays: days,
    readings: aggregate._count._all,
    avgTemperatureC: aggregate._avg.temperatureC != null ? Number(aggregate._avg.temperatureC.toFixed(2)) : null,
    minTemperatureC: aggregate._min.temperatureC,
    maxTemperatureC: aggregate._max.temperatureC,
    anomalies: anomalyCount,
  });
});
