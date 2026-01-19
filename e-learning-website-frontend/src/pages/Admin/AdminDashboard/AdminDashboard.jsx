import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
      const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Admin Dashboard</h2>
        <p>Manage courses and users</p>
      </header>

      <section className={styles.actions}>
        <button onClick={() => navigate("/admin/create-course")}>
          + Create Course
        </button>
      </section>
    </div>
  );
}
