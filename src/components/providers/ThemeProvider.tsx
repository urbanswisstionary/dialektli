"use client"

import { useMemo, useState, useEffect, createContext, useContext } from "react"
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import type { ReactNode } from "react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter"

type ColorMode = "light" | "dark" | "system"

interface ColorSchemeContextType {
  mode: ColorMode
  setMode: (mode: ColorMode) => void
}

const ColorSchemeContext = createContext<ColorSchemeContextType>({
  mode: "light",
  setMode: () => {},
})

export const useColorScheme = () => useContext(ColorSchemeContext)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>("system")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedMode = localStorage.getItem("colorMode") as ColorMode | null
    if (savedMode) {
      setModeState(savedMode)
    }
  }, [])

  const setMode = (newMode: ColorMode) => {
    setModeState(newMode)
    localStorage.setItem("colorMode", newMode)
  }

  const resolvedMode = useMemo(() => {
    if (!mounted) return "light"
    if (mode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }
    return mode
  }, [mode, mounted])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedMode,
          primary: {
            main: resolvedMode === "dark" ? "#90caf9" : "#1976d2",
          },
          secondary: {
            main: resolvedMode === "dark" ? "#f48fb1" : "#dc004e",
          },
          background: {
            default: resolvedMode === "dark" ? "#121212" : "#fafafa",
            paper: resolvedMode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
        typography: {
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
          ].join(","),
        },
      }),
    [resolvedMode],
  )

  return (
    <ColorSchemeContext.Provider value={{ mode, setMode }}>
      <AppRouterCacheProvider options={{ key: "css" }}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </AppRouterCacheProvider>
    </ColorSchemeContext.Provider>
  )
}
