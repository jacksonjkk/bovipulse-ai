import { asyncHandler } from "../lib/asyncHandler.js";
import { prisma } from "../lib/prisma.js";
import { requireFarm } from "../lib/farmScope.js";

const DAY_MS = 86_400_000;

const toDateKey = (date) => date.toISOString().slice(0, 10);

function buildTemperatureTrend(readings, days) {
  const buckets = new Map();
  for (const reading of readings) {
    const key = toDateKey(reading.capturedAt);
    if (!buckets.has(key)) buckets.set(key, { sum: 0, count: 0 });
    const bucket = buckets.get(key);
    bucket.sum += reading.temperatureC;
    bucket.count += 1;
  }

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(Date.now() - (days - 1 - index) * DAY_MS);
    const key = toDateKey(date);
    const bucket = buckets.get(key);
    return {
      date: key,
      avgTemperatureC: bucket ? Number((bucket.sum / bucket.count).toFixed(2)) : null,
      samples: bucket?.count ?? 0,
    };
  });
}

export const getOverview = asyncHandler(async (req, res) => {
  const farm = await requireFarm(req.user);

  const now = new Date();
  const in14Days = new Date(now.getTime() + 14 * DAY_MS);
  const weekAgo = new Date(now.getTime() - 7 * DAY_MS);

  const [
    cattleTotal,
    healthGroups,
    pregnancyGroups,
    upcomingVaccinations,
    overdueVaccinations,
    completedVaccinations30d,
    inventoryItems,
    unreadAlerts,
    recentAlerts,
    breedGroups,
    readings,
    alertsLast7d,
  ] = await Promise.all([
    prisma.cattle.count({ where: { farmId: farm.id } }),
    prisma.cattle.groupBy({
      by: ["healthStatus"],
      _count: { _all: true },
      where: { farmId: farm.id },
    }),
    prisma.cattle.groupBy({
      by: ["pregnancyStatus"],
      _count: { _all: true },
      where: { farmId: farm.id },
    }),
    prisma.vaccination.count({
      where: {
        cattle: { farmId: farm.id },
        status: "SCHEDULED",
        nextDueDate: { gte: now, lte: in14Days },
      },
    }),
    prisma.vaccination.count({
      where: { cattle: { farmId: farm.id }, status: "SCHEDULED", nextDueDate: { lt: now } },
    }),
    prisma.vaccination.count({
      where: { cattle: { farmId: farm.id }, status: "COMPLETED", doseDate: { gte: weekAgo } },
    }),
    prisma.inventoryItem.findMany({
      where: { farmId: farm.id },
      select: { quantity: true, reorderLevel: true, unit: true, name: true },
    }),
    prisma.alert.count({ where: { farmId: farm.id, isRead: false } }),
    prisma.alert.findMany({
      where: { farmId: farm.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { cattle: { select: { tagNumber: true, name: true } } },
    }),
    prisma.cattle.groupBy({
      by: ["breed"],
      _count: { _all: true },
      where: { farmId: farm.id, breed: { not: null } },
    }),
    prisma.thermalReading.findMany({
      where: { cattle: { farmId: farm.id }, capturedAt: { gte: weekAgo } },
      select: { temperatureC: true, capturedAt: true, anomaly: true },
      orderBy: { capturedAt: "asc" },
    }),
    prisma.alert.findMany({
      where: { farmId: farm.id, createdAt: { gte: weekAgo } },
      select: { createdAt: true, type: true },
    }),
  ]);

  const lowStockItems = inventoryItems.filter((item) => item.quantity <= item.reorderLevel);

  const healthDistribution = Object.fromEntries(
    healthGroups.map((group) => [group.healthStatus, group._count._all])
  );
  const pregnancyDistribution = Object.fromEntries(
    pregnancyGroups.filter((g) => g.pregnancyStatus).map((group) => [group.pregnancyStatus, group._count._all])
  );

  const herdComposition = breedGroups
    .map((group) => ({ breed: group.breed, count: group._count._all }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const temperatureTrend = buildTemperatureTrend(
    readings.map((r) => ({ ...r, capturedAt: r.capturedAt })),
    7
  );

  const anomalyCount7d = readings.filter((r) => r.anomaly).length;
  const avgTemperatureC =
    readings.length > 0
      ? Number(
          (
            readings.reduce((sum, r) => sum + r.temperatureC, 0) / readings.length
          ).toFixed(2)
        )
      : null;

  const alertTrendBuckets = new Map();
  for (let i = 6; i >= 0; i -= 1) {
    alertTrendBuckets.set(toDateKey(new Date(now.getTime() - i * DAY_MS)), 0);
  }
  for (const alert of alertsLast7d) {
    const key = toDateKey(alert.createdAt);
    if (alertTrendBuckets.has(key)) alertTrendBuckets.set(key, alertTrendBuckets.get(key) + 1);
  }

  res.json({
    summary: {
      cattleTotal,
      healthy: healthDistribution.HEALTHY ?? 0,
      atRisk:
        (healthDistribution.SICK ?? 0) +
        (healthDistribution.UNDER_TREATMENT ?? 0) +
        (healthDistribution.QUARANTINED ?? 0),
      pregnant: pregnancyDistribution.PREGNANT ?? 0,
      upcomingVaccinations,
      overdueVaccinations,
      completedVaccinations7d: completedVaccinations30d,
      lowStockCount: lowStockItems.length,
      unreadAlerts,
      avgTemperatureC,
      temperatureAnomalies7d: anomalyCount7d,
    },
    healthDistribution,
    pregnancyDistribution,
    herdComposition,
    temperatureTrend,
    alertTrend: Array.from(alertTrendBuckets.entries()).map(([date, count]) => ({ date, count })),
    lowStockItems,
    recentAlerts,
  });
});
