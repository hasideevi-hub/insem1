import React, { useState, useEffect } from "react";

function App() {
  const [courses, setCourses] = useState([]);
  const [registered, setRegistered] = useState([]);

  // Fetch courses from db.json
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Register for a course
  const handleRegister = (course) => {
    if (!registered.find((c) => c.id === course.id)) {
      setRegistered([...registered, course]);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📚 Online Course Registration</h1>

      {/* Available Courses */}
      <h2>Available Courses</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {courses.map((course) => (
          <li
            key={course.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{course.title}</h3>
            <p>Instructor: {course.instructor}</p>
            <p>Duration: {course.duration}</p>
            <button
              onClick={() => handleRegister(course)}
              disabled={registered.find((c) => c.id === course.id)}
              style={{
                backgroundColor: registered.find((c) => c.id === course.id)
                  ? "gray"
                  : "#1976d2",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                cursor: registered.find((c) => c.id === course.id)
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {registered.find((c) => c.id === course.id)
                ? "Registered"
                : "Register"}
            </button>
          </li>
        ))}
      </ul>

      {/* Registered Courses */}
      <h2>✅ Registered Courses</h2>
      {registered.length === 0 ? (
        <p>No courses registered yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {registered.map((course) => (
            <li
              key={course.id}
              style={{
                border: "1px solid green",
                margin: "10px 0",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: "#f0fff0",
              }}
            >
              <h3>{course.title}</h3>
              <p>Instructor: {course.instructor}</p>
              <p>Duration: {course.duration}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
