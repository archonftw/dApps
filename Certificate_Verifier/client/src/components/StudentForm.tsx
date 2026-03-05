import { useState } from "react";
import { generatePDF } from "../logic/code";

type FormData = {
  studentName: string;
  course: string;
};

export default function StudentForm() {
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    course: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.studentName || !formData.course) {
      setError("Both fields are required");
      return;
    }

    generatePDF(formData)

    console.log(formData);
    setError("");

    setFormData({
      studentName: "",
      course: "",
    });
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Student Form</h2>

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
    fontFamily: "sans-serif",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "30px",
    width: "320px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};