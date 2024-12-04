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
      {/* How It Works Section */}
      <div className="info-section">
        <div className="info-text">
          <h2>Quick Composite in 3 Simple Steps</h2>
          <p>
            Simply join your chapter with a join code given to your by your exec.
            Upload your photo, making sure to use a simple, flat background and fill out the required fields.
            Fill out your email and your composite photo will be sent to your Chapter Executive Board.
          </p>
          <p>
            Those reponsible for creating the composite, go to Create New Chapter. Fill out the required fields. 
            You will be given a join code, share this with your Fraternity/Sorority Chapter. You will also be given an admin code.
            Save this code for your Executive board to alter the compsite.
          </p>
        </div>
        <div className="info-image">
          <img src="/how-it-works.png" alt="How it works illustration" />
        </div>
      </div>
      {/* Why Us Section */}
      <div className="info-section alt-section">
        <div className="info-image">
          <img src="/why-us.png" alt="Why us illustration" />
        </div>
        <div className="info-text">
          <h2>Why Choose Us?</h2>
          <p>
            Quick Composite offers unmatched convenience, affordability, and
            precision. We ensure that your chapter's memories are beautifully
            preserved with top-notch composites.
          </p>
        </div>
      </div>
    </div>
    
  );
};

export default MainScreen;