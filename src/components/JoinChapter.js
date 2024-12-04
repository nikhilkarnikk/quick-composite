import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "./JoinChapter.css"; // Ensure this CSS file exists and is correctly set up

// Initialize Supabase client
const supabase = createClient(
  "https://tufxymvifneolfvkhxeo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Znh5bXZpZm5lb2xmdmtoeGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIzMzI1MSwiZXhwIjoyMDQ3ODA5MjUxfQ.e7m1svwDzCGQEKgfaaHMXQqXgHWpMvt61eXJt5buKfk"
);

const JoinChapter = () => {
  const [joinCode, setJoinCode] = useState(""); // Input state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate();

  // Handle joining a chapter
  const handleJoin = async () => {
    setErrorMessage(""); // Reset error message

    if (!joinCode.trim()) {
      setErrorMessage("Please enter a chapter code.");
      return;
    }

    try {
      const isAdminCode = joinCode.endsWith("admin");
      const sanitizedCode = joinCode.trim();
      const queryColumn = isAdminCode ? "admin_code" : "unique_code";

      console.log("Joining with code:", sanitizedCode);
      console.log("Querying column:", queryColumn);

      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq(queryColumn, sanitizedCode);

      if (error) {
        console.error("Supabase error:", error);
        setErrorMessage("An error occurred while processing your request.");
        return;
      }

      if (!data || data.length === 0) {
        setErrorMessage("Invalid chapter code. Please try again.");
        return;
      }

      // Navigate based on whether it's an admin code or regular code
      if (isAdminCode) {
        navigate(`/admin/${data[0].id}`);
      } else {
        navigate(`/upload/${data[0].id}`);
      }
    } catch (err) {
      console.error("Error during join process:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

    return (
        
        <div className="join-chapter">

            {/* Overlay */}
            <div className="overlay"></div>
            
            
            {/* Main Form Content */}
            <div className="content-container">
                {/* Back Button */}
                <button className="back-button" onClick={() => navigate("/")}>
                    ← Back
                </button>

                

                
                {/* Logo */}
                <img src="/app-logo.png" alt="Quick Composite Logo" className="logo" />
                
                {/* Title */}
                <h1>Quick Composite</h1>
                
                {/* Form Input */}
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Chapter Code"
                        value={joinCode}
                        onChange={(e) => {
                            setJoinCode(e.target.value);
                            setErrorMessage(""); // Clear error on input change
                        }}
                        className="chapter-input"
                    />
                </div>
                
                {/* Join Button */}
                <button onClick={handleJoin} className="join-button">
                    Join
                </button>
                
                {/* Error Message */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            
        </div>
    );

};

export default JoinChapter;
