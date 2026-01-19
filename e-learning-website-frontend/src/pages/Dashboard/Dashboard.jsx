import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyEnrollments } from "../../api/enrollment.api";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const data = await getMyEnrollments(token);
        setEnrollments(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, [token]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Dashboard</h2>
      </header>

      <section className={styles.welcome}>
        <h3>Welcome, {user?.name} 👋</h3>
        <p>Continue your learning journey.</p>
      </section>

      <section className={styles.courses}>
        <h4>Your Enrolled Courses</h4>

        {loading && <p>Loading your courses...</p>}

        {!loading && enrollments.length === 0 && (
          <div className={styles.empty}>
            You haven’t enrolled in any courses yet.
          </div>
        )}

        <div className={styles.grid}>
          {enrollments.map((enroll) => (
            <div key={enroll._id} className={styles.card}>
              <h5>{enroll.courseId.title}</h5>

              <p className={styles.progress}>
                Progress: {enroll.progress.percentage}%
              </p>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${enroll.progress.percentage}%` }}
                />
              </div>

              <Link to={`/learn/${enroll._id}`} className={styles.continueBtn}>
                Continue Learning →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
