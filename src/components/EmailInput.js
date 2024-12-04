import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import "./EmailInput.css";

// Initialize Supabase client
const supabase = createClient(
  "https://tufxymvifneolfvkhxeo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Znh5bXZpZm5lb2xmdmtoeGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIzMzI1MSwiZXhwIjoyMDQ3ODA5MjUxfQ.e7m1svwDzCGQEKgfaaHMXQqXgHWpMvt61eXJt5buKfk"
);

const EmailInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileName = location.state?.fileName || "";

  // Debugging log to verify fileName
  console.log("File name received in EmailInput:", fileName);

  const handleEmailSubmit = async () => {
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Please provide an email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const { data, error } = await supabase.from("members").insert([
        {
          key: fileName,
          email: email,
        },
      ]);

      if (error) {
        console.error("Error inserting into members table:", error);
        setErrorMessage("Failed to save email. Please try again.");
        return;
      }

      alert("Email saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="email-input-container">
      <div className="overlay"></div>
      <div className="content-container">
        <h1>Enter Your Email</h1>
        <div className="form-group">
          <label>Your email will be used to send you updates</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <button onClick={handleEmailSubmit} className="submit-button">
          Submit
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default EmailInput;
