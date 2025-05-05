import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Projects.module.css";

const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.projects}>
      <h2 className={styles.title}>{t("projects.title")}</h2>

      <div className={styles.projectsGrid}>
        {[0, 1, 2].map((index) => (
          <div key={index} className={styles.projectCard}>
            <div className={styles.projectImage}>
              <div className={styles.placeholder} />
            </div>
            <div className={styles.projectContent}>
              <h3>{t(`projects.items.${index}.title`)}</h3>
              <p>{t(`projects.items.${index}.description`)}</p>
              <button className={styles.projectButton}>
                {t("projects.viewMore")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
