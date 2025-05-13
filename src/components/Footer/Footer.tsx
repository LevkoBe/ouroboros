import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LuGithub, LuTwitter, LuLinkedin } from "react-icons/lu";
import styles from "./Footer.module.css";
import { ThemeContext } from "@/contexts/ThemeContext";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img
              src={theme === "dark" ? "./logo-white.svg" : "./logo.svg"}
              alt="Ouroboros Logo"
            />{" "}
            <span>Ouroboros</span>
          </div>

          <div className={styles.links}>
            <a href="#">{t("footer.links.privacy")}</a>
            <a href="#">{t("footer.links.terms")}</a>
          </div>
        </div>

        <div className={styles.socialLinks}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <LuGithub />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <LuTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <LuLinkedin />
          </a>
        </div>

        <div className={styles.copyright}>{t("footer.copyright")}</div>
      </div>
    </footer>
  );
};

export default Footer;
