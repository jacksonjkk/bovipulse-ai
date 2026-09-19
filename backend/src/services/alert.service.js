import { prisma } from "../lib/prisma.js";

export const createAlert = ({ farmId, cattleId = null, type, severity = "LOW", title, message }) =>
  prisma.alert.create({
    data: { farmId, cattleId, type, severity, title, message },
  });

export const SEVERITY_ORDER = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
