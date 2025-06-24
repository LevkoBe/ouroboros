import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../../public/locales/en/translation.json";
import ukTranslation from "../../public/locales/uk/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  uk: {
    translation: ukTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
