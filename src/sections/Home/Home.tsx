import React from "react";
import { useTranslation } from "react-i18next";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const scrollToSection = useScrollToSection();

  const handleCTAClick = () => {
    scrollToSection("about");
  };

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t("home.title")}</h1>
        <p className={styles.subtitle}>{t("home.subtitle")}</p>
        <button className={styles.ctaButton} onClick={handleCTAClick}>
          {t("home.cta")}
        </button>
      </div>
    </div>
  );
};

export default Home;
