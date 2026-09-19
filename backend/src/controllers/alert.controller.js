import { asyncHandler } from "../lib/asyncHandler.js";
import { HttpError } from "../lib/httpError.js";
import { prisma } from "../lib/prisma.js";
import { requireFarm } from "../lib/farmScope.js";
import { getPagination, paginated } from "../lib/pagination.js";

const ALERT_TYPES = ["HEALTH", "VACCINATION", "INVENTORY", "SYSTEM"];

export const listAlerts = asyncHandler(async (req, res) => {
  const farm = await requireFarm(req.user);
  const { page, limit, skip, take } = getPagination(req.query);

  const where = { farmId: farm.id };
  if (typeof req.query.isRead === "string") {
    where.isRead = req.query.isRead === "true";
  }
  const type = typeof req.query.type === "string" ? req.query.type.toUpperCase() : "";
  if (type && ALERT_TYPES.includes(type)) where.type = type;
  const severity = typeof req.query.severity === "string" ? req.query.severity.toUpperCase() : "";
  if (severity) where.severity = severity;

  const [total, unreadCount, rows] = await Promise.all([
    prisma.alert.count({ where }),
    prisma.alert.count({ where: { farmId: farm.id, isRead: false } }),
    prisma.alert.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        cattle: { select: { id: true, tagNumber: true, name: true, photoUrl: true } },
      },
    }),
  ]);

  res.json({ ...paginated(rows, total, page, limit), unreadCount });
});

export const markAlertRead = asyncHandler(async (req, res) => {
  const farm = await requireFarm(req.user);

  const result = await prisma.alert.updateMany({
    where: { id: req.params.id, farmId: farm.id },
    data: { isRead: true },
  });
  if (result.count === 0) throw new HttpError(404, "Alert not found");

  res.json({ success: true });
});

export const markAllAlertsRead = asyncHandler(async (req, res) => {
  const farm = await requireFarm(req.user);

  const result = await prisma.alert.updateMany({
    where: { farmId: farm.id, isRead: false },
    data: { isRead: true },
  });

  res.json({ updated: result.count });
});

export const deleteAlert = asyncHandler(async (req, res) => {
  const farm = await requireFarm(req.user);

  const result = await prisma.alert.deleteMany({
    where: { id: req.params.id, farmId: farm.id },
  });
  if (result.count === 0) throw new HttpError(404, "Alert not found");

  res.status(204).send();
});
