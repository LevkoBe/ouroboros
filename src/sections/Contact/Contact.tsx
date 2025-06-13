import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const emailAddress = "info@ouroboros-ua.com";

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleEmailClick = () => {
    copyToClipboard(emailAddress, t("contact.emailCopied"));
  };

  return (
    <div>
      <h1 className={styles.heading}>{t("contact.title")}</h1>
      <div className={styles.container}>
        <div className={styles.description}>
          <p>{t("contact.description")}</p>
        </div>
        <div className={styles.buttons}>
          <a
            href={`mailto:${emailAddress}`}
            className={styles.emailButton}
            onClick={handleEmailClick}
          >
            {t("contact.email")}
          </a>
          <a
            href={`https://www.instagram.com/ouroboros_ua/`}
            className={styles.messageButton}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message on Instagram"
          >
            {t("contact.message")}
          </a>
        </div>
      </div>

      {showAlert && <div className={styles.alert}>{alertMessage}</div>}
    </div>
  );
};

export default Contact;
