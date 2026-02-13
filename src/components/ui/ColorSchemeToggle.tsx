"use client"

import type { FC } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMounted } from "@/hooks/useIsMounted"
import { useTranslations } from "next-intl"
import { useColorScheme } from "@/components/providers/ThemeProvider"

const ColorSchemeToggle: FC = () => {
  const t = useTranslations()
  const { mode, setMode, resolvedMode } = useColorScheme()
  const mounted = useIsMounted()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      disabled={!mounted}
      aria-label={t("actions.toggleColorScheme")}
      title={t("actions.toggleColorScheme")}
    >
      {!mounted || resolvedMode === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  )
}

export default ColorSchemeToggle
