import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./CourseDetail.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function CourseDetail() {
  const { slug } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/api/courses/${slug}`);
        const data = await res.json();
        setCourse(data);
      } catch {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Enrollment failed");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <p className={styles.loading}>Loading course...</p>;
  if (!course) return <p className={styles.error}>Course not found</p>;

  return (
    <div className={styles.container}>
      <h2>{course.title}</h2>
      <p className={styles.description}>{course.description}</p>

      <div className={styles.meta}>
        <span>{course.category}</span>
        <span>{course.difficulty}</span>
        <span>₹{course.price}</span>
      </div>

      <section className={styles.lessons}>
        <h4>Course Content</h4>
        <ul>
          {course.lessons.map((lesson, idx) => (
            <li key={idx}>{lesson.title}</li>
          ))}
        </ul>
      </section>

      {error && <p className={styles.error}>{error}</p>}

      <button
        onClick={handleEnroll}
        disabled={enrolling}
        className={styles.enrollBtn}
      >
        {user ? "Enroll in Course" : "Login to Enroll"}
      </button>
    </div>
  );
}
