import { createContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
import de from "../locales/de.json";

export const I18nContext = createContext();

const translations = { en, ar, de };

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    const root = document.documentElement;

    // Always set lang attribute
    root.lang = language;

    // Set direction: RTL for Arabic, LTR for others
    root.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  const changeLanguage = (lang) => {
    if (lang in translations) {
      setLanguage(lang);
    }
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
