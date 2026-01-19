import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
});

const courseSchema = new mongoose.Schema(
  {
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

/* ✅ SAFE SLUG GENERATION */
courseSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
});

export default mongoose.model("Course", courseSchema);
