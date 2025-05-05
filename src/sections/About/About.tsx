import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./About.module.css";

const About: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    { key: "simplicity", icon: "✨" },
    { key: "accessibility", icon: "🌐" },
    { key: "performance", icon: "🚀" },
    { key: "innovation", icon: "💡" },
  ];

  return (
    <div className={styles.about}>
      <h2 className={styles.title}>{t("about.title")}</h2>
      <p className={styles.description}>{t("about.description")}</p>

      <div className={styles.valuesSection}>
        <h3>{t("about.values.title")}</h3>
        <div className={styles.valuesGrid}>
          {values.map((value) => (
            <div key={value.key} className={styles.valueCard}>
              <span className={styles.valueIcon}>{value.icon}</span>
              <h4>{t(`about.values.${value.key}`)}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
