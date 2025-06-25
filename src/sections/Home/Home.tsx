import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import styles from "./Home.module.css";
import { ThemeContext } from "@/contexts/ThemeContext";
import { Button } from "@/components/Button/Button";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const scrollToSection = useScrollToSection();

  const handleCTAClick = () => {
    scrollToSection("about");
  };

  return (
    <div className={styles.home}>
      <div className={styles.logoContainer}>
        <img
          src={theme === "dark" ? "./logo-white.svg" : "./logo.svg"}
          alt="Ouroboros Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.content}>
        <h1>{t("home.title")}</h1>
        <p className={styles.subtitle}>{t("home.subtitle")}</p>
        <p className={styles.description}>{t("home.description")}</p>
        <Button onClick={handleCTAClick}>{t("home.cta")}</Button>
      </div>
    </div>
  );
};

export default Home;
