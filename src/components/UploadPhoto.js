import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from "react-router-dom";
import "./UploadPhoto.css";

// Initialize Supabase client
const supabase = createClient(
  "https://tufxymvifneolfvkhxeo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Znh5bXZpZm5lb2xmdmtoeGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIzMzI1MSwiZXhwIjoyMDQ3ODA5MjUxfQ.e7m1svwDzCGQEKgfaaHMXQqXgHWpMvt61eXJt5buKfk"
);

const UploadPhoto = () => {
  const { chapterId } = useParams();
  const [fullName, setFullName] = useState("");
  const [year, setYear] = useState("");
  const [position, setPosition] = useState("");
  const [recentlyInitiated, setRecentlyInitiated] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleUpload = async () => {
    setErrorMessage("");
    if (!photo || !fullName || !year) {
      setErrorMessage("Please fill out all required fields and upload a photo.");
      return;
    }

    try {
      const formattedFileName = `${chapterId}_${fullName.replace(
        / /g,
        " "
      )}_${year}_${position || "n-a"}_${recentlyInitiated ? "y" : "n"}.${
        photo.name.split(".").pop()
      }`;

      const formData = new FormData();
      formData.append("file", photo);

      const response = await fetch(
        `https://tufxymvifneolfvkhxeo.supabase.co/storage/v1/object/photos/${formattedFileName}`,
        {
          method: "POST",
          body: formData,
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Znh5bXZpZm5lb2xmdmtoeGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIzMzI1MSwiZXhwIjoyMDQ3ODA5MjUxfQ.e7m1svwDzCGQEKgfaaHMXQqXgHWpMvt61eXJt5buKfk",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Znh5bXZpZm5lb2xmdmtoeGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIzMzI1MSwiZXhwIjoyMDQ3ODA5MjUxfQ.e7m1svwDzCGQEKgfaaHMXQqXgHWpMvt61eXJt5buKfk",
          },
        }
      );

      if (!response.ok) {
        setErrorMessage("Failed to upload photo. Please try again.");
        return;
      }

      alert("Photo uploaded successfully!");
      setFullName("");
      setYear("");
      setPosition("");
      setRecentlyInitiated(false);
      setPhoto(null);
      navigate("/");
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="upload-photo-container">
      <h1>Upload Your Photo</h1>
      <div
        className={`photo-dropbox ${dragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        {photo ? (
          <p>{photo.name}</p>
        ) : (
          <p>Drag and drop your photo here or click to select</p>
        )}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
      </div>
      <div className="form-group">
        <label>Full Name*</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
        />
      </div>
      <div className="form-group">
        <label>Year*</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Ex. 1 for Freshman"
        />
      </div>
      <div className="form-group">
        <label>Position</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Optional"
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={recentlyInitiated}
            onChange={(e) => setRecentlyInitiated(e.target.checked)}
          />
          Recently Initiated
        </label>
      </div>
      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default UploadPhoto;
