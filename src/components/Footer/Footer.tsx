import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuGithub, LuInstagram, LuMail } from "react-icons/lu";
import styles from "./Footer.module.css";
import { ThemeContext } from "@/contexts/ThemeContext";
import Popup from "../Popup/Popup";
import { formatMarkdown } from "@/utils/formatMarkdown";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const scrollToSection = useScrollToSection();
  const [activePopup, setActivePopup] = useState<"privacy" | "terms" | null>(
    null
  );

  const handlePopup = (type: "privacy" | "terms") => () => setActivePopup(type);
  const closePopup = () => setActivePopup(null);

  const renderPopupContent = (type: "privacy" | "terms") => {
    const title = t(`footer.${type}Popup.title`);
    const content = formatMarkdown(t(`footer.${type}Popup.content`));
    return (
      <Popup onClose={closePopup} title={title}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Popup>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div
            className={`${styles.logo} clickable`}
            onClick={() => scrollToSection("home")}
          >
            <img
              src={theme === "dark" ? "./logo-white.svg" : "./logo.svg"}
              alt="Ouroboros Logo"
            />
            <span>Ouroboros</span>
          </div>

          <div className={styles.links}>
            <button onClick={handlePopup("privacy")}>
              {t("footer.links.privacy")}
            </button>
            <button onClick={handlePopup("terms")}>
              {t("footer.links.terms")}
            </button>
          </div>
        </div>

        <div className={styles.socialLinks}>
          <a
            href="mailto:info@ouroboros-ua.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <LuMail />
          </a>
          <a
            href="https://www.instagram.com/ouroboros_ua/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <LuInstagram />
          </a>
          <a
            href="https://github.com/LevkoBe/ouroboros"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <LuGithub />
          </a>
        </div>

        <div className={styles.copyright}>{t("footer.copyright")}</div>

        {activePopup === "privacy" && renderPopupContent("privacy")}
        {activePopup === "terms" && renderPopupContent("terms")}
      </div>
    </footer>
  );
};

export default Footer;
