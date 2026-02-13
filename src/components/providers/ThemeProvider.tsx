"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

type ColorMode = "light" | "dark" | "system"

interface ColorSchemeContextType {
  mode: ColorMode
  setMode: (mode: ColorMode) => void
  resolvedMode: "light" | "dark"
}

const ColorSchemeContext = createContext<ColorSchemeContextType>({
  mode: "light",
  setMode: () => {},
  resolvedMode: "light",
})

export const useColorScheme = () => useContext(ColorSchemeContext)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>("system")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("colorMode") as ColorMode | null
    if (saved) setModeState(saved)
  }, [])

  const setMode = (newMode: ColorMode) => {
    setModeState(newMode)
    localStorage.setItem("colorMode", newMode)
  }

  const resolvedMode = (() => {
    if (!mounted) return "light" as const
    if (mode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? ("dark" as const)
        : ("light" as const)
    }
    return mode
  })()

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle("dark", resolvedMode === "dark")
  }, [resolvedMode, mounted])

  return (
    <ColorSchemeContext.Provider value={{ mode, setMode, resolvedMode }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}
