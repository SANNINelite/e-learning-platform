import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./CreateCourse.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function CreateCourse() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    difficulty: "beginner",
  });

  const [lessons, setLessons] = useState([
    { title: "", content: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLessonChange = (index, field, value) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  const addLesson = () => {
    setLessons([...lessons, { title: "", content: "" }]);
  };

  const removeLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, lessons }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Course</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
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

        <h4>Lessons</h4>

        {lessons.map((lesson, index) => (
          <div key={index} className={styles.lesson}>
            <input
              placeholder="Lesson Title"
              value={lesson.title}
              onChange={(e) =>
                handleLessonChange(index, "title", e.target.value)
              }
              required
            />

            <textarea
              placeholder="Lesson Content / Video URL"
              value={lesson.content}
              onChange={(e) =>
                handleLessonChange(index, "content", e.target.value)
              }
            />

            {lessons.length > 1 && (
              <button
                type="button"
                onClick={() => removeLesson(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addLesson}>
          + Add Lesson
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
