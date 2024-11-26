import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://tufxymvifneolfvkhxeo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Znh5bXZpZm5lb2xmdmtoeGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIzMzI1MSwiZXhwIjoyMDQ3ODA5MjUxfQ.e7m1svwDzCGQEKgfaaHMXQqXgHWpMvt61eXJt5buKfk");

const JoinChapter = () => {
  const [joinCode, setJoinCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("join_code", joinCode.replace("admin", ""));

      if (error) {
        console.error(error);
        return;
      }

      if (data.length > 0) {
        if (joinCode.endsWith("admin")) {
          navigate(`/admin/${data[0].id}`);
        } else {
          navigate(`/upload/${data[0].id}`);
        }
      } else {
        alert("Invalid join code.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="join-chapter-container">
      <h1>Join a Chapter</h1>
      <div className="form-group">
        <label htmlFor="join-code">Enter Join Code:</label>
        <input
          type="text"
          id="join-code"
          placeholder="Enter join code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
      </div>
      <button onClick={handleJoin}>Join</button>
      <button onClick={() => navigate("/")}>Return to Main Page</button>
    </div>
  );
};

export default JoinChapter;
