import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

// javascript 에서 브라우저가 DARK 모드인지 확인
const LOCAL_STORAGE_DARK_MODE = "darkTheme";
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const storedDarkMode = localStorage.getItem(LOCAL_STORAGE_DARK_MODE); // 로컬스토리지에 저장된 값 확인

  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  return storedDarkMode === "true";
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // 로컬스토리지에 저장하여 다음에 접속시 자동으로 저장된 값으로 설정되도록 함.
    localStorage.setItem(LOCAL_STORAGE_DARK_MODE, newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
