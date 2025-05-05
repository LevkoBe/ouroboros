import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Support.module.css";

const Support: React.FC = () => {
  const { t } = useTranslation();

  const supportOptions = [
    { key: "donate", icon: "💰" },
    { key: "sponsor", icon: "🌟" },
    { key: "contribute", icon: "💻" },
  ];

  return (
    <div className={styles.support}>
      <h2 className={styles.title}>{t("support.title")}</h2>
      <p className={styles.description}>{t("support.description")}</p>

      <div className={styles.optionsGrid}>
        {supportOptions.map((option) => (
          <div key={option.key} className={styles.optionCard}>
            <span className={styles.optionIcon}>{option.icon}</span>
            <h3>{t(`support.options.${option.key}`)}</h3>
            <button className={styles.optionButton}>
              {t(`support.options.${option.key}`)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
