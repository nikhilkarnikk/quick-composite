import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "./CreateChapter.css";

// Initialize Supabase client
const supabase = createClient(
  "https://tufxymvifneolfvkhxeo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Znh5bXZpZm5lb2xmdmtoeGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIzMzI1MSwiZXhwIjoyMDQ3ODA5MjUxfQ.e7m1svwDzCGQEKgfaaHMXQqXgHWpMvt61eXJt5buKfk"
);

const CreateChapter = () => {
  const [fraternityName, setFraternityName] = useState("");
  const [chapterName, setChapterName] = useState("");
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
      <h1>Create a New Chapter</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fraternity/Sorority Name:
          <input
            type="text"
            value={fraternityName}
            placeholder="Ex. Sigma Chi"
            onChange={(e) => setFraternityName(e.target.value)}
            required
          />
        </label>
        <label>
          Chapter Name:
          <input
            type="text"
            placeholder="Ex. Kappa Beta"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            required
          />
        </label>
        <label>
          Year:
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option>2019-2020</option>
            <option>2020-2021</option>
            <option>2021-2022</option>
            <option>2022-2023</option>
            <option>2023-2024</option>
            <option>2024-2025</option>
            <option>2025-2026</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* Display Generated Codes */}
      {uniqueCode && (
        <div className="codes">
          <p>Unique Code: {uniqueCode}</p>
          <p>Admin Code: {adminCode}</p>
        </div>
      )}
      <button className="return-btn" onClick={goToMainPage}>
        Return to Main Page
      </button>
    </div>
  );
};

export default CreateChapter;
