import Course from "../models/Course.js";

// GET /api/courses
export const getCourses = async (req, res) => {
  try {
    const { category, difficulty, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};


// GET /api/courses/:slug
export const getCourseBySlug = async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
};

// POST /api/courses (admin)
export const createCourse = async (req, res, next) => {
  try {
   const course = await Course.create({
  ...req.body,
  owner: req.user.id,
});

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

// PUT /api/courses/:id (admin)
export const updateCourse = async (req, res, next) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/courses/:id (admin)
export const deleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    next(error);
  }
};
