import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./EditCourse.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditCourse() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load course");

        const data = await res.json();
        setForm(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_URL}/api/admin/courses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      navigate("/admin/courses");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading course...</p>;
  if (!form) return <p>Course not found</p>;

  return (
    <div className={styles.container}>
      <h2>Edit Course</h2>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <button type="submit">Update Course</button>
      </form>
    </div>
  );
}
