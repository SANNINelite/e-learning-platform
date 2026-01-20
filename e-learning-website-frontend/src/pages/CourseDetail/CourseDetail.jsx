import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CourseDetail.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/api/courses/${slug}`);
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.log(err)
        console.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) return <p className={styles.loading}>Loading course...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>{course.title}</h1>
        <p className={styles.description}>{course.description}</p>

        <div className={styles.meta}>
          <span>{course.category}</span>
          <span>{course.difficulty}</span>
          <span>₹{course.price}</span>
        </div>
      </header>

      {/* CONTENT */}
      <section className={styles.content}>
        <h3>Course Lessons</h3>

        {course.lessons.length === 0 ? (
          <p>No lessons added yet.</p>
        ) : (
          <ul className={styles.lessonList}>
            {course.lessons.map((lesson, index) => (
              <li key={index} className={styles.lessonItem}>
                {lesson.title}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ACTION */}
      <section className={styles.actions}>
        <button className={styles.enrollBtn}>
          Enroll in Course
        </button>
      </section>
    </div>
  );
}
