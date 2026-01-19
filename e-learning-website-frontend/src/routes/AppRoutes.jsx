import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Navbar from "../components/Navbar/Navbar";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Courses from "../pages/Courses/Courses";
import CourseDetail from "../pages/CourseDetail/CourseDetail";
import LessonView from "../pages/LessonView/LessonView";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import CreateCourse from "../pages/Admin/CreateCourse/CreateCourse";
import AdminCourses from "../pages/Admin/AdminCourses/AdminCourses";
import EditCourse from "../pages/Admin/EditCourse/EditCourse";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn/:enrollmentId"
          element={
            <ProtectedRoute>
              <LessonView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-course"
          element={
            <ProtectedRoute adminOnly>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute adminOnly>
              <AdminCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses/:id/edit"
          element={
            <ProtectedRoute adminOnly>
              <EditCourse />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
