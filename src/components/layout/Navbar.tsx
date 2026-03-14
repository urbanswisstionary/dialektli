"use client"

import {
  Plus,
  Search,
  User,
  LogOut,
  LogIn,
  Map,
  Home,
  Users,
  BookOpen,
  Bookmark,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useState, type FC } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Logo from "@/components/ui/Logo"
import SearchExpressionsInput from "@/components/ui/SearchExpressionsInput"
import SelectLocale from "@/components/ui/SelectLocale"
import { companyName } from "@/config/constants"
import { useMe } from "@/hooks/useUsers"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

import MobileDrawer from "./MobileDrawer"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const Navbar: FC = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const { me, isAdmin, loading: meLoading } = useMe()

  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:gap-4">
        {/* Logo + Brand */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-foreground no-underline"
        >
          <Logo size="small" />
          <span className="hidden text-lg font-bold tracking-tight sm:inline">
            {companyName}
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden flex-1 items-center gap-2 md:flex md:max-w-120">
          <SearchExpressionsInput className="w-full" />
          {me && (
            <Button variant="default" size="sm" asChild disabled={meLoading}>
              <Link
                href="/expressions/new"
                className={cn(meLoading && "pointer-events-none opacity-50")}
              >
                <Plus className="h-4 w-4" />
                {t("expression.newExpression.title")}
              </Link>
            </Button>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1 md:hidden" />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn(
              pathname === "/" &&
                "bg-accent font-semibold text-accent-foreground",
            )}
          >
            <Link href="/">
              <Home className="mr-1.5 h-4 w-4" />
              {t("layout.sidebar.home")}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn(
              pathname === "/sprachatlas" &&
                "bg-accent font-semibold text-accent-foreground",
            )}
          >
            <Link href="/sprachatlas">
              <Map className="mr-1.5 h-4 w-4" />
              {t("layout.sidebar.sprachatlas")}
            </Link>
          </Button>
          <SelectLocale compact />
          <ColorSchemeToggle />

          {me ? (
            <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                  aria-label={t("layout.sidebar.profile")}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-xs font-medium text-primary-foreground">
                      {getInitials(me.name ?? me.email ?? "U")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-foreground">
                    {me.name ?? me.email}
                  </p>
                  {me.name && (
                    <p className="text-xs text-muted-foreground">{me.email}</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account/profile">
                    <User className="mr-2 h-4 w-4" />
                    {t("layout.sidebar.profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/profile?view=expressions">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {t("layout.sidebar.expressions")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/profile?view=favorites">
                    <Bookmark className="mr-2 h-4 w-4" />
                    {t("layout.sidebar.favorites")}
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile?view=users">
                      <Users className="mr-2 h-4 w-4" />
                      {t("layout.sidebar.users")}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setUserMenuOpen(false)
                    signOut({ callbackUrl: "/" })
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("layout.sidebar.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild disabled={meLoading}>
              <Link
                href="/auth/signin"
                className={cn(meLoading && "pointer-events-none opacity-50")}
              >
                <LogIn className="mr-1.5 h-4 w-4" />
                {t("layout.sidebar.signIn")}
              </Link>
            </Button>
          )}
        </nav>

        {/* Mobile: search icon + dark mode + drawer */}
        <div className="flex items-center gap-1 md:hidden">
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <Link href="/" aria-label={t("actions.search")}>
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <ColorSchemeToggle />
          <MobileDrawer />
        </div>
      </div>
    </header>
  )
}

export default Navbar
