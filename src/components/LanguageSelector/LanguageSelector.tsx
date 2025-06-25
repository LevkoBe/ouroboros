import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LangContext } from "../../contexts/LangContext";
import { Button } from "../Button/Button";

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useContext(LangContext);
  const { t } = useTranslation();

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "uk" : "en");
  };

  return (
    <Button
      variant="outlined"
      style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
      onClick={toggleLanguage}
      aria-label={t(`language.${language}`)}
    >
      {language === "en" ? "EN" : "UA"}
    </Button>
  );
};

export default LanguageSelector;
