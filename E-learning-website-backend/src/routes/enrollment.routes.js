import express from "express";
import {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
} from "../controllers/enrollment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/enroll", protect, enrollCourse);
router.get("/enrollments/me", protect, getMyEnrollments);
router.patch("/enrollments/:id/progress", protect, updateProgress);

export default router;
    