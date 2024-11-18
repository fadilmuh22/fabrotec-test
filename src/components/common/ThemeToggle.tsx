"use client";

import { IconButton, useTheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeModeContext } from "@/components/providers/AppProvider";
import { useContext } from "react";

export default function ThemeToggle() {
  const theme = useTheme();
  const { toggleThemeMode } = useContext(ThemeModeContext);

  return (
    <IconButton
      onClick={() => toggleThemeMode()}
      aria-label="Toggle dark mode"
      color="inherit"
    >
      {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
