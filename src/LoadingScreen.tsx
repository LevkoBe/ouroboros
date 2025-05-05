import React, { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

const LoadingScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="loading-screen">
      <div className="logo-container">
        <img
          src={theme === "dark" ? "/logo-white.svg" : "/logo.svg"}
          alt="Ouroboros Logo"
          className="spinning-logo"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
