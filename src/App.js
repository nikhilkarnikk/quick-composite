import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainScreen from "./components/MainScreen";
import CreateChapter from "./components/CreateChapter";
import JoinChapter from "./components/JoinChapter";
import UploadPhoto from "./components/UploadPhoto";
import AdminPage from "./components/AdminPanel";
import EmailInput from "./components/EmailInput";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Screen */}
        <Route path="/" element={<MainScreen />} />
        
        {/* Create a New Chapter */}
        <Route path="/create-chapter" element={<CreateChapter />} />
        
        {/* Join an Existing Chapter */}
        <Route path="/join-chapter" element={<JoinChapter />} />
        
        {/* Upload Photos for a Chapter */}
        <Route path="/upload/:chapterId" element={<UploadPhoto />} />
        <Route path="/email-input/:chapterId" element={<EmailInput />} />
        
        {/* Admin Page for Chapter */}
        <Route path="/admin/:chapterId" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
