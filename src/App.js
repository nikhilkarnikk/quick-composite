import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import CreateChapter from "./components/CreateChapter";
 
import JoinChapter from "./components/JoinChapter";
import UploadPhoto from "./components/UploadPhoto";
import AdminPage from "./components/AdminPanel";
console.log(CreateChapter); // This should log the component or `undefined` if there's an issue.


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/create-chapter" element={<CreateChapter />} />
        <Route path="/join-chapter" element={<JoinChapter />} />
        <Route path="/upload/:chapterId" element={<UploadPhoto />} />
        <Route path="/admin/:chapterId" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
