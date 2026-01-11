import { useContext } from "react";
import { getI18nContext } from "./providers";

export const useI18n = () => {
  const context = useContext(getI18nContext());
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};
