import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./AdminCourses.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminCourses() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminCourses();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${API_URL}/api/admin/courses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      // Remove deleted course from UI
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p className={styles.loading}>Loading your courses...</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Your Courses</h2>

      {error && <p className={styles.error}>{error}</p>}

      {courses.length === 0 ? (
        <p>You haven’t created any courses yet.</p>
      ) : (
        <div className={styles.grid}>
          {courses.map((course) => (
            <div key={course._id} className={styles.card}>
              <h4>{course.title}</h4>
              <p>{course.description}</p>

              <span className={styles.meta}>
                {course.category} · {course.difficulty}
              </span>

              <div className={styles.actions}>
                <button
                  onClick={() =>
                    navigate(`/admin/courses/${course._id}/edit`)
                  }
                >
                  Edit
                </button>

                <button
                  className={styles.danger}
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
