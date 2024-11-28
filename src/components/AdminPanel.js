import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useNavigate } from "react-router-dom";
import "./AdminPanel.css"; // Optional CSS for styling

// Initialize Supabase client
const supabase = createClient(
  "https://tufxymvifneolfvkhxeo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Znh5bXZpZm5lb2xmdmtoeGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIzMzI1MSwiZXhwIjoyMDQ3ODA5MjUxfQ.e7m1svwDzCGQEKgfaaHMXQqXgHWpMvt61eXJt5buKfk"
);

const AdminPanel = () => {
  const { chapterId } = useParams(); // Get `chapterId` from the URL
  const navigate = useNavigate(); // For navigation
  const [files, setFiles] = useState([]);
  const [chapterInfo, setChapterInfo] = useState(null); // To store fraternity, chapter name, school, and year
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchChapterInfoAndFiles = async () => {
      try {
        setErrorMessage("");

        // Fetch the chapter details using `chapterId`
        const sanitizedChapterId = chapterId.replace("admin", "");
        const { data: chapters, error: chapterError } = await supabase
          .from("chapters")
          .select("fraternity_name, school, chapter_name, year, id")
          .eq("id", sanitizedChapterId)
          .single(); // Ensure single result

        if (chapterError || !chapters) {
          setErrorMessage("Failed to fetch chapter information.");
          console.error("Chapter Fetch Error:", chapterError);
          return;
        }

        setChapterInfo(chapters); // Save chapter information for display

        // List all files in the bucket
        const { data: bucketFiles, error: bucketError } = await supabase.storage
          .from("photos")
          .list("", { limit: 100 });

        if (bucketError || !bucketFiles) {
          setErrorMessage("Failed to fetch photos from storage.");
          console.error("Bucket Fetch Error:", bucketError);
          return;
        }

        // Filter files that start with the chapter ID
        const filteredFiles = bucketFiles.filter((file) =>
          file.name.startsWith(`${chapters.id}_`)
        );

        // Generate signed URLs for each file
        const filesWithSignedUrls = await Promise.all(
          filteredFiles.map(async (file) => {
            const { data: signedUrlData, error: signedUrlError } =
              await supabase.storage
                .from("photos")
                .createSignedUrl(file.name, 60 * 60 * 24 * 7); // 1-week expiry

            if (signedUrlError) {
              console.error("Error generating signed URL:", signedUrlError);
              return { ...file, signedUrl: null };
            }

            return { ...file, signedUrl: signedUrlData.signedUrl };
          })
        );

        setFiles(filesWithSignedUrls);
      } catch (error) {
        console.error("Error fetching files:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    };

    fetchChapterInfoAndFiles();
  }, [chapterId]);

  // Extract data from file names and render rows
  const renderRows = () => {
    return files.map((file) => {
      const [_, fullName, year, position, extra] = file.name
        .replace(".jpg", "")
        .split("_");

      const positionFinal =
        position !== "n-a" ? position.replace(/-/g, " ") : "No Position";
      const name = fullName.replace(/_/g, " ");
      const photoUrl = file.signedUrl;

      return (
        <tr key={file.name}>
          <td>{name}</td>
          <td>{positionFinal}</td>
          <td>{year}</td>
          <td>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="photo-thumbnail"
                onError={(e) => (e.target.src = "/placeholder.png")} // Fallback in case the photo fails to load
              />
            ) : (
              "Photo not available"
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="admin-panel">
      {/* Home Button */}
      <button
        className="home-button"
        onClick={() => navigate("/")} // Navigate to home
      >
        Home
      </button>

      {/* Chapter Information */}
      {chapterInfo && (
        <div>
          <h1>{chapterInfo.fraternity_name}</h1>
          <h2>{chapterInfo.school}</h2>
          <h3>{chapterInfo.chapter_name}</h3>
          <h4>{chapterInfo.year}</h4>
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Position</th>
            <th>Year</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
