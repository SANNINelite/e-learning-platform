import Course from "../models/Course.js";

/**
 * GET /api/admin/courses
 * Admin: get only courses created by this admin
 */
export const getAdminCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      owner: req.user.id, // 🔐 ownership filter
    }).sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin courses" });
  }
};
// DELETE /api/admin/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 🔐 ownership check
    if (course.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};
// GET /api/admin/courses/:id
export const getAdminCourseById = async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    owner: req.user.id,
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(course);
};
// PUT /api/admin/courses/:id
export const updateCourse = async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    owner: req.user.id,
  });

  if (!course) {
    return res.status(404).json({ message: "Not found" });
  }

  Object.assign(course, req.body);
  await course.save();

  res.json(course);
};
