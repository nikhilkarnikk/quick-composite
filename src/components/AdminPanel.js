import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Adjust path if necessary

const AdminPage = ({ chapterId }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .eq("chapter_id", chapterId);

      if (error) {
        console.error(error);
        return;
      }

      setPhotos(data);
    };

    fetchPhotos();
  }, [chapterId]);

  return (
    <div className="admin-page-container">
      <h1>Uploaded Photos</h1>
      <div className="photo-grid">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.url} alt="Uploaded" />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
