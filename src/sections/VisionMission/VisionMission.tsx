import { useTranslation } from "react-i18next";
import styles from "./VisionMission.module.css";
import { useFutureProjects } from "@/hooks/useFutureProjects";
import { ExpandableContent } from "@/components/ExpandableContent/ExpandableContent";

const VisionMission = () => {
  const { t } = useTranslation();
  const futureProjects = useFutureProjects();

  return (
    <section>
      <h1>{t("visionMission.title")}</h1>

      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <div className={styles.sectionContainer}>
            <h2>{t("visionMission.vision.title")}</h2>
            <ExpandableContent text={t("visionMission.vision.extendedText")} />
          </div>

          <div className={styles.sectionContainer}>
            <h2>{t("visionMission.mission.title")}</h2>
            <ExpandableContent text={t("visionMission.mission.extendedText")} />
          </div>

          <div className={styles.sectionContainer}>
            <h2>{t("visionMission.futureProjects.title")}</h2>

            {futureProjects.map((project) => (
              <div key={project.id} className={styles.projectItem}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <ExpandableContent text={project.description} />
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
