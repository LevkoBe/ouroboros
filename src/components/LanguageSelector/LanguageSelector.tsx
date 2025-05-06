import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LangContext } from "../../contexts/LangContext";

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useContext(LangContext);
  const { t } = useTranslation();

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "uk" : "en");
  };

  return (
    <button
      style={{ fontSize: "0.875rem", padding: "0.25rem 0.5rem" }}
      onClick={toggleLanguage}
      aria-label={t(`language.${language}`)}
    >
      {language === "en" ? "EN" : "UA"}
    </button>
  );
};

export default LanguageSelector;
