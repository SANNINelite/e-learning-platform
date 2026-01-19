import express from "express";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { getAdminCourses } from "../controllers/admin.controller.js";
import { deleteCourse } from "../controllers/admin.controller.js";
import { getAdminCourseById } from "../controllers/admin.controller.js";
import { updateCourse } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/courses", protect, adminOnly, getAdminCourses);
router.delete("/courses/:id",protect,adminOnly,deleteCourse);
router.get("/courses/:id",protect,adminOnly,getAdminCourseById);
router.put("/courses/:id",protect,adminOnly,updateCourse);

export default router;