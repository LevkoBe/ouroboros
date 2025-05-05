import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Language = "en" | "uk";

interface LangContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LangContext = createContext<LangContextType>({
  language: "en",
  changeLanguage: () => {},
});

interface LangProviderProps {
  children: ReactNode;
}

export const LangProvider: React.FC<LangProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();

  const getInitialLanguage = (): Language => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && ["en", "uk"].includes(savedLang)) {
      return savedLang;
    }

    const browserLang = navigator.language.split("-")[0];
    return browserLang === "uk" ? "uk" : "en";
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.setAttribute("lang", language);
    localStorage.setItem("language", language);
  }, [language, i18n]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LangContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
};
