"use client"

import type { FC } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Globe } from "lucide-react"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import Flag from "./Flag"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Locale = (typeof routing.locales)[number]

interface SelectLocaleProps {
  compact?: boolean
  className?: string
}

const getFlagCode = (locale: string) => {
  if (locale === "en") return "gb"
  return locale
}

const SelectLocale: FC<SelectLocaleProps> = ({ compact, className }) => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const t = useTranslations()

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-1", className)}
          title={t("selectLanguage.title")}
        >
          {compact ? (
            <>
              <Flag mode="country" code={getFlagCode(currentLocale)} />
              {currentLocale.toUpperCase()}
            </>
          ) : (
            <>
              <Globe className="h-4 w-4" />
              {t(`selectLanguage.${currentLocale}`)}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleChange(locale)}
            className="flex items-center gap-2"
          >
            <Flag mode="country" code={getFlagCode(locale)} />
            {compact ? locale.toUpperCase() : t(`selectLanguage.${locale}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SelectLocale
