import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./About.module.css";

const About = () => {
  const { t } = useTranslation();
  const [showExtended, setShowExtended] = useState(false);

  const toggleExtendedText = () => {
    setShowExtended(!showExtended);
  };

  return (
    <section className={styles.aboutSection}>
      <h1>{t("about.title", "About us")}</h1>

      <div className={styles.contentContainer}>
        <div className={styles.imageContainer}>
          <img
            src={t("about.image.src")}
            alt={t("about.image.altKey")}
            className={styles.image}
          />
        </div>

        <div
          style={{ flex: showExtended ? 5 : 3 }}
          className={styles.textContainer}
        >
          <div className={styles.textContent}>
            <div
              className={`${styles.mainText} ${
                showExtended ? styles.hidden : styles.visible
              }`}
            >
              {t("about.mainText")}
            </div>

            <div
              className={`${styles.extendedText} ${
                showExtended ? styles.visible : styles.hidden
              }`}
            >
              <p>{t("about.extendedText.part1")}</p>
              <p>{t("about.extendedText.part2")}</p>
              <p>{t("about.extendedText.part3")}</p>
              <p>{t("about.extendedText.part4")}</p>
              <p>{t("about.extendedText.part5")}</p>
              <p>{t("about.extendedText.part6")}</p>
            </div>
          </div>

          <button
            onClick={toggleExtendedText}
            className={styles.learnMoreButton}
          >
            {showExtended ? t("common.button.less") : t("common.button.more")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
