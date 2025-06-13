import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Embeds.module.css";
import { LuInstagram, LuMail, LuCopy, LuCheck } from "react-icons/lu";

const ShareLinks: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    email:
      "mailto:info@ouroboros-ua.com?subject=Check%20out%20Ouroboros&body=I%20thought%20you%20might%20be%20interested%20in%20this:%20https://ouroboros-ua.com",
    instagram: "https://www.instagram.com/ouroboros_ua/",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("https://ouroboros-ua.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.embed}>
      <h3>{t("support.options.share.title")}</h3>
      <p>{t("support.options.share.description")}</p>

      <div className={styles.socialButtons}>
        <a
          href={shareUrls.email}
          className={styles.socialButton}
          aria-label="Share via Email"
        >
          <LuMail className={styles.socialIcon} />
          <span>Email</span>
        </a>

        <a
          href={shareUrls.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialButton}
          aria-label="Share on Instagram"
        >
          <LuInstagram className={styles.socialIcon} />
          <span>Instagram</span>
        </a>
      </div>

      <div className={styles.copyLinkWrapper}>
        <input
          type="text"
          readOnly
          value="https://ouroboros-ua.com"
          className={styles.linkInput}
          aria-label="URL to copy"
        />
        <button
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? (
            <LuCheck className={styles.copyIcon} />
          ) : (
            <LuCopy className={styles.copyIcon} />
          )}
          <span>
            {copied
              ? t("support.options.share.emailCopied")
              : t("support.options.share.copy")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ShareLinks;
