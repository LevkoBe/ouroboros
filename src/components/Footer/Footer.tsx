import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src="./logo.svg" alt="Ouroboros Logo" />
            <span>Ouroboros</span>
          </div>

          <div className={styles.links}>
            <a href="#">{t("footer.links.privacy")}</a>
            <a href="#">{t("footer.links.terms")}</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.links.github")}
            </a>
          </div>
        </div>

        <div className={styles.copyright}>{t("footer.copyright")}</div>
      </div>
    </footer>
  );
};

export default Footer;
