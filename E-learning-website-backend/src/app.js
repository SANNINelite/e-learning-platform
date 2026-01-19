import express from "express";
import cors from "cors";
import corsOptions from "./config/cors.js";
import errorHandler from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// ✅ CORS FIRST
app.use(cors(corsOptions));

// Body parser
app.use(express.json());

// Routes
app.use("/api/admin",adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api", enrollmentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "SkillCraft E-Learning API running 🚀" });
});

// Error handler
app.use(errorHandler);

export default app;
