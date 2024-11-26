import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Adjust path if necessary

const UploadPhoto = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("photos")
        .upload(fileName, file);

      if (error) {
        console.error(error);
        alert("Upload failed.");
        return;
      }

      alert("Upload successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="upload-photo-container">
      <h1>Upload Your Photo</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPhoto;
