import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@/contexts/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";
import { Button } from "../Button/Button";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <Button
      variant="text"
      style={{ padding: "0.4rem", width: "2rem", height: "2rem" }}
      onClick={toggleTheme}
      aria-label={t(`theme.${theme === "light" ? "dark" : "light"}`)}
    >
      {theme === "light" ? <LuMoon /> : <LuSun />}
    </Button>
  );
};

export default ThemeToggle;
