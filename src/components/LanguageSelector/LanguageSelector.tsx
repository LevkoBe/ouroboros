import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LangContext } from "../../contexts/LangContext";
import styles from "./LanguageSelector.module.css";

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useContext(LangContext);
  const { t } = useTranslation();

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "uk" : "en");
  };

  return (
    <button
      className={styles.languageSelector}
      onClick={toggleLanguage}
      aria-label={t(`language.${language}`)}
    >
      {language === "en" ? "EN" : "UA"}
    </button>
  );
};

export default LanguageSelector;
