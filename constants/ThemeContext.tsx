import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const defaultThemeContextValue: ThemeContextType = {
  isDarkMode: false,
  setIsDarkMode: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContextValue);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
