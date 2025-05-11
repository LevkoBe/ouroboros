import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Embeds.module.css";
import {
  LuFacebook,
  LuTwitter,
  LuLinkedin,
  LuMail,
  LuCopy,
  LuCheck,
} from "react-icons/lu";

const ShareLinks: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  // Example URLs
  const shareUrls = {
    facebook:
      "https://www.facebook.com/sharer/sharer.php?u=https://ouroboros.com",
    twitter:
      "https://twitter.com/intent/tweet?url=https://ouroboros.com&text=Check out this amazing project!",
    linkedin:
      "https://www.linkedin.com/sharing/share-offsite/?url=https://ouroboros.com",
    email:
      "mailto:?subject=Check out this website&body=I thought you might be interested in this: https://ouroboros.com",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("https://ouroboros.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.embed}>
      <h3>{t("support.options.share.title")}</h3>
      <p>{t("support.options.share.description")}</p>

      <div className={styles.socialButtons}>
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialButton}
          aria-label="Share on Facebook"
        >
          <LuFacebook className={styles.socialIcon} />
          <span>Facebook</span>
        </a>

        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialButton}
          aria-label="Share on Twitter"
        >
          <LuTwitter className={styles.socialIcon} />
          <span>Twitter</span>
        </a>

        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialButton}
          aria-label="Share on LinkedIn"
        >
          <LuLinkedin className={styles.socialIcon} />
          <span>LinkedIn</span>
        </a>

        <a
          href={shareUrls.email}
          className={styles.socialButton}
          aria-label="Share via Email"
        >
          <LuMail className={styles.socialIcon} />
          <span>Email</span>
        </a>
      </div>

      <div className={styles.copyLinkWrapper}>
        <input
          type="text"
          readOnly
          value="https://ouroboros.com"
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
              ? t("support.options.share.copied")
              : t("support.options.share.copy")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ShareLinks;
