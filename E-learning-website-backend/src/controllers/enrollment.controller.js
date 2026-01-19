import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// POST /api/enroll
export const enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const enrollment = await Enrollment.create({
      userId,
      courseId,
      progress: {
        totalLessons: course.lessons.length,
      },
    });

    res.status(201).json(enrollment);
  } catch (error) {
    // duplicate enrollment
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already enrolled" });
    }
    next(error);
  }
};

// GET /api/enrollments/me
export const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({
      userId: req.user.id,
    }).populate("courseId");

    res.json(enrollments);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/enrollments/:id/progress
export const updateProgress = async (req, res, next) => {
  try {
    const { completedLessons } = req.body;

    if (completedLessons === undefined) {
      return res
        .status(400)
        .json({ message: "completedLessons is required" });
    }

    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    if (enrollment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    enrollment.progress.completedLessons = completedLessons;
    enrollment.progress.percentage = Math.round(
      (completedLessons / enrollment.progress.totalLessons) * 100
    );

    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    next(error);
  }
};
