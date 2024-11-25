import React from "react";
import "./MainButtons.css";

console.log(MainButtons); // Should log the component function

function MainButtons() {
  return (
    <div className="app-store-buttons">
      <a href="https://www.apple.com/app-store/" className="store-btn">
        <img src="/app-store.png" alt="Download on the App Store" />
      </a>
      <a href="https://play.google.com/" className="store-btn">
        <img src="/google-play.png" alt="Get it on Google Play" />
      </a>
    </div>
  );
}

export default MainButtons;
