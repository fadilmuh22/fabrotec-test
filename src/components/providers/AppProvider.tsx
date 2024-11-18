"use client";

import { ThemeProvider } from "@emotion/react";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  useMediaQuery,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useMemo, useState } from "react";

const queryClient = new QueryClient();

export const ThemeModeContext = createContext({
  toggleThemeMode: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [themeMode, setThemeMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode as PaletteMode,
        },
      }),
    [themeMode]
  );

  useEffect(() => {
    setThemeMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const themModeContextValue = useMemo(
    () => ({
      toggleThemeMode: () =>
        setThemeMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeContext.Provider value={themModeContextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </QueryClientProvider>
  );
}
