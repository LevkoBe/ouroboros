import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./VisionMission.module.css";
import { useFutureProjects } from "@/hooks/useFutureProjects";

const VisionMission = () => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const futureProjects = useFutureProjects();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <section>
      <h1>{t("visionMission.title")}</h1>

      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          {/* Vision Section */}
          <div className={styles.sectionContainer}>
            <h2>{t("visionMission.vision.title")}</h2>
            <div>
              <div
                className={`${styles.mainText} ${
                  !expandedSections.vision ? styles.visible : styles.hidden
                }`}
              >
                {t("visionMission.vision.mainText")}
              </div>

              <div
                className={`${styles.extendedText} ${
                  expandedSections.vision ? styles.visible : styles.hidden
                }`}
              >
                {t("visionMission.vision.extendedText")}
              </div>
            </div>

            <button
              onClick={() => toggleSection("vision")}
              className={styles.learnMoreButton}
            >
              {expandedSections.vision
                ? t("common.button.less")
                : t("common.button.more")}
            </button>
          </div>

          {/* Mission Section */}
          <div className={styles.sectionContainer}>
            <h2>{t("visionMission.mission.title")}</h2>
            <div>
              <div
                className={`${styles.mainText} ${
                  !expandedSections.mission ? styles.visible : styles.hidden
                }`}
              >
                {t("visionMission.mission.mainText")}
              </div>

              <div
                className={`${styles.extendedText} ${
                  expandedSections.mission ? styles.visible : styles.hidden
                }`}
              >
                {t("visionMission.mission.extendedText")}
              </div>
            </div>

            <button
              onClick={() => toggleSection("mission")}
              className={styles.learnMoreButton}
            >
              {expandedSections.mission
                ? t("common.button.less")
                : t("common.button.more")}
            </button>
          </div>

          {/* Future Projects */}
          <div className={styles.sectionContainer}>
            <h2>{t("visionMission.futureProjects.title")}</h2>

            {futureProjects.map((project) => (
              <div key={project.id} className={styles.projectItem}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p
                  className={`${styles.projectDescription} ${
                    expandedSections[project.id]
                      ? styles.expanded
                      : styles.clipped
                  }`}
                >
                  {t(
                    `visionMission.futureProjects.project${project.id}.description`,
                    project.description
                  )}
                </p>

                <button
                  onClick={() => toggleSection(project.id)}
                  className={styles.learnMoreButton}
                >
                  {expandedSections[project.id]
                    ? t("common.button.less")
                    : t("common.button.more")}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={t("visionMission.image.src")}
            alt={t("visionMission.image.altKey")}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
