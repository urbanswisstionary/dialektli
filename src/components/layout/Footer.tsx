"use client"

import type { FC } from "react"
import { Separator } from "@/components/ui/separator"
import { Link, usePathname } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { companyName } from "@/config/constants"

const footerSections = {
  about: [{ href: "/about", label: "about" }],
  legal: [
    { href: "/tos", label: "termsOfService" },
    { href: "/privacy-policy", label: "privacyPolicy" },
    { href: "/dmca", label: "dmca" },
    { href: "/accessibility", label: "accessibility" },
  ],
  connect: [
    { href: "/contact-us", label: "contact" },
    { href: "/bug-report", label: "bugReport" },
  ],
} as const

const Footer: FC = () => {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          <div className="flex-1">
            <h3 className="mb-2 text-base font-semibold text-primary">
              {t("layout.footer.sections.about")}
            </h3>
            <div className="flex flex-col gap-1.5">
              {footerSections.about.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-sm transition-all duration-200 hover:translate-x-1 hover:text-primary ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {t(`layout.footer.${label}`)}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="mb-2 text-base font-semibold text-primary">
              {t("layout.footer.sections.legal")}
            </h3>
            <div className="flex flex-col gap-1.5">
              {footerSections.legal.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-sm transition-all duration-200 hover:translate-x-1 hover:text-primary ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {t(`layout.footer.${label}`)}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="mb-2 text-base font-semibold text-primary">
              {t("layout.footer.sections.connect")}
            </h3>
            <div className="flex flex-col gap-1.5">
              {footerSections.connect.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-sm transition-all duration-200 hover:translate-x-1 hover:text-primary ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {t(`layout.footer.${label}`)}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <p className="text-center text-sm text-muted-foreground">
          © {companyName} {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
