import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "./CreateChapter.css";

// Initialize Supabase client
const supabase = createClient(
  "https://tufxymvifneolfvkhxeo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Znh5bXZpZm5lb2xmdmtoeGVvIiwicm9sZSIsInNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIzMzI1MSwiZXhwIjoyMDQ3ODA5MjUxfQ.e7m1svwDzCGQEKgfaaHMXQqXgHWpMvt61eXJt5buKfk"
);

const CreateChapter = () => {
  const [fraternityName, setFraternityName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("2019-2020");
  const [uniqueCode, setUniqueCode] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const navigate = useNavigate();

  // Generate Unique Code
  const generateCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 8); // Random 4 letters and 2 numbers
    const yearSuffix = year.split("-")[1]; // Get the last year in the range
    return `${randomCode}${yearSuffix}`;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = generateCode();
    const admin = `${code}admin`;

    // Save to Supabase
    const { error } = await supabase.from("chapters").insert([
      {
        fraternity_name: fraternityName,
        chapter_name: chapterName,
        school,
        year,
        unique_code: code,
        admin_code: admin,
      },
    ]);

    if (error) {
      alert("Error creating chapter: " + error.message);
    } else {
      setUniqueCode(code);
      setAdminCode(admin);
      alert("Chapter created successfully!");
    }
  };

  const goToMainPage = () => {
    navigate("/");
  };

  return (
    <div className="create-chapter">
      <div className="overlay"></div>
      <div className="content-container">
        <h1>Create A New Chapter</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Fraternity/Sorority Name:</label>
            <input
              type="text"
              value={fraternityName}
              placeholder="Ex. Sigma Chi"
              onChange={(e) => setFraternityName(e.target.value)}
              required
              className="chapter-input"
            />
          </div>
          <div className="form-group">
            <label>Chapter Name:</label>
            <input
              type="text"
              placeholder="Ex. Kappa Beta"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              required
              className="chapter-input"
            />
          </div>
          <div className="form-group">
            <label>School:</label>
            <input
              type="text"
              placeholder="Ex. University of California, Los Angeles"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
              className="chapter-input"
            />
          </div>
          <div className="form-group">
            <label>Year:</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="chapter-input"
            >
              <option>2019-2020</option>
              <option>2020-2021</option>
              <option>2021-2022</option>
              <option>2022-2023</option>
              <option>2023-2024</option>
              <option>2024-2025</option>
              <option>2025-2026</option>
            </select>
          </div>
          <div className="button-container">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button
              type="button"
              className="home-btn"
              onClick={goToMainPage}
            >
              Return to Main Page
            </button>
          </div>
        </form>
        {uniqueCode && (
          <div className="codes">
            <p>Unique Code: {uniqueCode}</p>
            <p>Admin Code: {adminCode}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateChapter;
