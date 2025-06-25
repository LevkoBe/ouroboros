import { useTranslation } from "react-i18next";
import styles from "./About.module.css";
import { ExpandableContent } from "@/components/ExpandableContent/ExpandableContent";
import { useState } from "react";

const About = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpended] = useState(false);

  return (
    <section className={styles.aboutSection}>
      <h1>{t("about.title", "About us")}</h1>

      <div className={styles.contentContainer}>
        <div
          className={`${styles.imageContainer} ${
            isExpanded ? styles.smaller : styles.bigger
          }`}
        >
          <img
            src={t("about.image.src")}
            alt={t("about.image.altKey")}
            className={styles.image}
          />
        </div>

        <div className={styles.textContainer}>
          <ExpandableContent
            text={t("about.text")}
            clampLines={5}
            variant="primary"
            onChange={setIsExpended}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
