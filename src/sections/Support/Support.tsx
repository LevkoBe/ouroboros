import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Support.module.css";
import VolunteerForm from "./embeds/VolunteerForm";
import LiqPayDonate from "./embeds/LiqPayDonate";
import PartnerForm from "./embeds/PartnerForm";
import ShareLinks from "./embeds/ShareLinks";
import { LuArrowBigRight } from "react-icons/lu";

type SupportOption = "donate" | "volunteer" | "partner" | "share";

const Support: React.FC = () => {
  const { t } = useTranslation();
  const [activeOption, setActiveOption] = useState<SupportOption>("volunteer");

  const SUPPORT_OPTIONS: { key: SupportOption; component: React.ReactNode }[] =
    [
      {
        key: "donate",
        component: (
          <LiqPayDonate
            data={t("support.options.donate.data")}
            signature={t("support.options.donate.signature")}
          />
        ),
      },
      { key: "volunteer", component: <VolunteerForm /> },
      { key: "partner", component: <PartnerForm /> },
      { key: "share", component: <ShareLinks /> },
    ];

  const handleOptionClick = (option: SupportOption) => {
    setActiveOption((prev) => (prev === option ? "volunteer" : option));
  };

  const renderEmbed = () =>
    SUPPORT_OPTIONS.find((opt) => opt.key === activeOption)?.component || (
      <VolunteerForm />
    );

  return (
    <div className={styles.support}>
      <div className={styles.optionsContainer}>
        <h2 className={styles.sectionHeader}>{t("support.title")}</h2>
        <p className={styles.ctaText}>{t("support.cta")}</p>

        <div className={styles.optionsMenu}>
          {SUPPORT_OPTIONS.map((opt, idx) => (
            <React.Fragment key={opt.key}>
              {activeOption === opt.key && (
                <LuArrowBigRight className={styles.activeIcon} />
              )}
              <button
                className={`${styles.optionButton} ${
                  activeOption === opt.key ? styles.active : ""
                }`}
                onClick={() => handleOptionClick(opt.key)}
              >
                {t(`support.options.${opt.key}.title`)}
              </button>
              {idx < SUPPORT_OPTIONS.length - 1 && (
                <span className={styles.separator}>·</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className={styles.gratitudeText}>{t("support.gratitude")}</p>
      </div>

      <div className={styles.embedContainer}>{renderEmbed()}</div>
    </div>
  );
};

export default Support;
