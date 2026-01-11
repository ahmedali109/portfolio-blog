import { useState, useRef, useEffect } from "react";
import { useI18n } from "../context/useI18n";

const LANGUAGES = [
  {
    code: "en",
    name: "English",
    flag: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" fill="#012169" />
        <path
          d="M0 0L32 21.3333M32 0L0 21.3333"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M0 0L32 21.3333M32 0L0 21.3333"
          stroke="#C8102E"
          strokeWidth="2"
        />
        <path d="M16 0V32M0 16H32" stroke="white" strokeWidth="5.33" />
        <path d="M16 0V32M0 16H32" stroke="#C8102E" strokeWidth="3.2" />
      </svg>
    ),
  },
  {
    code: "ar",
    name: "العربية",
    flag: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="10.67" fill="#CE1126" />
        <rect y="10.67" width="32" height="10.67" fill="white" />
        <rect y="21.33" width="32" height="10.67" fill="black" />
      </svg>
    ),
  },
  {
    code: "de",
    name: "Deutsch",
    flag: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="10.67" fill="black" />
        <rect y="10.67" width="32" height="10.67" fill="#DD0000" />
        <rect y="21.33" width="32" height="10.67" fill="#FFCE00" />
      </svg>
    ),
  },
];

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = LANGUAGES.find((lang) => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 border border-gray-300 dark:border-gray-700"
        title="Change language"
      >
        <div className="flex items-center">{currentLang?.flag}</div>
        <span className="text-sm font-medium hidden sm:inline">
          {currentLang?.code.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors duration-200 ${
                language === lang.code
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              } ${
                lang.code !== "de"
                  ? "border-b border-gray-200 dark:border-gray-700"
                  : ""
              }`}
            >
              <div className="flex items-center">{lang.flag}</div>
              <div className="flex-1">
                <div className="text-sm font-medium">{lang.name}</div>
                <div className="text-xs opacity-75">
                  {lang.code.toUpperCase()}
                </div>
              </div>
              {language === lang.code && (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
