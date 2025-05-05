import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ThemeToggle.module.css";
import { ThemeContext } from "@/contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={t(`theme.${theme === "light" ? "dark" : "light"}`)}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
