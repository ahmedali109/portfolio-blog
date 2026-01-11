import { useContext } from "react";
import { getThemeContext } from "./providers";

export const useTheme = () => {
  const context = useContext(getThemeContext());
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
