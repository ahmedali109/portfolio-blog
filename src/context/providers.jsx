import { createContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
import de from "../locales/de.json";

// Theme Context (not exported - used internally)
const ThemeContext = createContext();

// Export getter for hooks to access context
export const getThemeContext = () => ThemeContext;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  // Apply theme on initial mount
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const changeTheme = (newTheme) => {
    if (["dark", "light"].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// I18n Context (not exported - used internally)
const I18nContext = createContext();

// Export getter for hooks to access context
export const getI18nContext = () => I18nContext;

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
