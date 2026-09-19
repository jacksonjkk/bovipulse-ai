import { Router } from "express";
import {
  createReading,
  listReadings,
  getSummary,
} from "../controllers/thermal.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.get("/readings", listReadings);
router.post("/readings", createReading);
router.get("/summary", getSummary);

export default router;
