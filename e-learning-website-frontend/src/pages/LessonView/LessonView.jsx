import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./LessonView.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function LessonView() {
  const { enrollmentId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchEnrollment = async () => {
      const res = await fetch(`${API_URL}/api/enrollments/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      const current = data.find((e) => e._id === enrollmentId);
      setEnrollment(current);
      setLoading(false);
    };

    fetchEnrollment();
  }, [enrollmentId, token]);

  const handleCompleteLesson = async () => {
    setUpdating(true);

    const completed = enrollment.progress.completedLessons + 1;

    await fetch(
      `${API_URL}/api/enrollments/${enrollment._id}/progress`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completedLessons: completed }),
      }
    );

    navigate("/dashboard");
  };

  if (loading) return <p>Loading lesson...</p>;
  if (!enrollment) return <p>Enrollment not found</p>;

  const lessons = enrollment.courseId.lessons;
  const currentIndex = enrollment.progress.completedLessons;
  const lesson = lessons[currentIndex];

  return (
    <div className={styles.container}>
      <h2>{enrollment.courseId.title}</h2>

      <div className={styles.lessonBox}>
        <h3>{lesson.title}</h3>
        <p>{lesson.content || "Lesson content goes here."}</p>
      </div>

      <button
        disabled={updating}
        onClick={handleCompleteLesson}
        className={styles.completeBtn}
      >
        Mark as Completed
      </button>
    </div>
  );
}
