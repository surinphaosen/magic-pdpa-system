"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/i18n";
const LanguageContext = createContext(undefined);
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("en"); // Default to English
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "th")) {
            setLanguage(savedLanguage);
        }
    }, []);
    const handleSetLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };
    const t = (key) => {
        const keys = key.split(".");
        let value = translations[language];
        for (const k of keys) {
            value = value === null || value === void 0 ? void 0 : value[k];
        }
        return value || key;
    };
    return (<LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>);
}
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
