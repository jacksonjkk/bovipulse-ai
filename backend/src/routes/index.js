import { Router } from "express";

import authRoutes from "./auth.routes.js";
import farmRoutes from "./farm.routes.js";
import cattleRoutes from "./cattle.routes.js";
import vaccinationRoutes from "./vaccination.routes.js";
import inventoryRoutes from "./inventory.routes.js";
import alertRoutes from "./alert.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import muzzleRoutes from "./muzzle.routes.js";
import thermalRoutes from "./thermal.routes.js";
import gestaRoutes from "./gesta.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/farms", farmRoutes);
router.use("/cattle", cattleRoutes);
router.use("/vaccinations", vaccinationRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/alerts", alertRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/muzzleid", muzzleRoutes);
router.use("/thermaguard", thermalRoutes);
router.use("/gestacheck", gestaRoutes);

export default router;
