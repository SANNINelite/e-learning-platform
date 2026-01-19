import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Courses.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(filters);
        const res = await fetch(
          `${API_URL}/api/courses?${params.toString()}`
        );
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.log(err)
        console.error("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Explore Courses</h2>
        <p>Browse and filter courses to start learning</p>
      </header>

      {/* FILTER BAR */}
      <div className={styles.filters}>
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="web">Web</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>

        <select
          value={filters.difficulty}
          onChange={(e) =>
            setFilters({ ...filters, difficulty: e.target.value })
          }
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
        />
      </div>

      {/* COURSE GRID */}
      {loading ? (
        <p className={styles.loading}>Loading courses...</p>
      ) : (
        <div className={styles.grid}>
          {courses.map((course) => (
            <Link
              key={course._id}
              to={`/courses/${course.slug}`}
              className={styles.card}
            >
              <div className={styles.cardContent}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>

                <div className={styles.meta}>
                  <span>{course.category}</span>
                  <span>{course.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
