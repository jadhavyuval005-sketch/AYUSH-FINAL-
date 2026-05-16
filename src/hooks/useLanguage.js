import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "lang";

function useLanguage() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language || "en";
  const isHindi = language === "hi";

  const setLanguage = useMemo(
    () => (nextLanguage) => {
      i18n.changeLanguage(nextLanguage);
      try {
        localStorage.setItem(STORAGE_KEY, nextLanguage);
      } catch {
        // Ignore storage failures.
      }
    },
    [i18n]
  );

  const toggleLanguage = useMemo(
    () => () => {
      setLanguage(isHindi ? "en" : "hi");
    },
    [isHindi, setLanguage]
  );

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue || event.newValue === i18n.language) {
        return;
      }

      i18n.changeLanguage(event.newValue);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [i18n]);

  return {
    language,
    isHindi,
    setLanguage,
    toggleLanguage,
  };
}

export default useLanguage;