import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        SkillCraft
      </Link>

      <div className={styles.links}>
        <Link to="/courses">Courses</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className={styles.primary}>
              Get Started
            </Link>
          </>
        )}

        {user?.role === "user" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout} className={styles.logout}>
              Logout
            </button>
          </>
        )}

        {user?.role === "admin" && (
  <>
    <Link to="/admin/courses">Your Courses</Link>
    <Link to="/admin">Dashboard</Link>
    <button onClick={logout} className={styles.logout}>
      Logout
    </button>
  </>
)}

      </div>
    </nav>
  );
}
