import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainScreen.css";

const MainScreen = () => {
  const navigate = useNavigate();

  const handleCreateChapterClick = () => {
    navigate("/create-chapter");
  };

  const handleJoinChapterClick = () => {
    navigate("/join-chapter");
  };

  return (
    <div className="main-screen">
      <div className="top-bar">
        <div className="logo-container">
          <img src="/app-logo.png" alt="Quick Composite Logo" className="logo-img" />
          <span className="logo-text">Quick Composite</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="content">
        <div className="text-content">
          <h1>Create your Greek Composite with just a picture.</h1>
          <p>
            Introducing Quick Composite, the AI-powered app that simplifies the
            process of getting your fraternity or sorority composite. Join your
            chapter, snap a photo, and let Quick Composite do the rest. Within
            minutes your composite is ready to be printed and shipped.
          </p>
          <div className="action-buttons">
            <button
              className="action-btn"
              onClick={handleJoinChapterClick}
            >
              Join Chapter
            </button>
            <button
              className="action-btn"
              onClick={handleCreateChapterClick}
            >
              Create New Chapter
            </button>
          </div>
        </div>
        <div className="app-preview">
          <img
            src="/app-preview.png"
            alt="App preview showing composite creation"
          />
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
