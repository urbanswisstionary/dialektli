"use client"

import { useState, type FC } from "react"
import {
  Menu,
  Map,
  Plus,
  User,
  LogOut,
  LogIn,
  Home,
  Users,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "@/i18n/navigation"
import { useMe } from "@/hooks/useUsers"
import { useTranslations } from "next-intl"
import { signOut } from "next-auth/react"
import { companyName } from "@/config/constants"
import SelectLocale from "@/components/ui/SelectLocale"
import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const MobileDrawer: FC = () => {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const { me, isAdmin, loading: meLoading } = useMe()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle className="text-left text-lg font-bold">
            {companyName}
          </SheetTitle>
        </SheetHeader>

        {!meLoading && me && (
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                {getInitials(me.name ?? me.email ?? "U")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">
                {me.name ?? me.email}
              </p>
              {me.name && (
                <p className="truncate text-xs text-muted-foreground">
                  {me.email}
                </p>
              )}
            </div>
          </div>
        )}

        <nav className="flex flex-col p-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
          >
            <Home className="h-4 w-4 text-muted-foreground" />
            {t("layout.sidebar.home")}
          </Link>
          <Link
            href="/sprachatlas"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
          >
            <Map className="h-4 w-4 text-muted-foreground" />
            {t("layout.sidebar.sprachatlas")}
          </Link>

          {!meLoading && me && (
            <>
              <Link
                href="/expressions/new"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <Plus className="h-4 w-4 text-muted-foreground" />
                {t("expression.newExpression.title")}
              </Link>

              <Separator className="my-2" />

              <Link
                href="/account/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <User className="h-4 w-4 text-muted-foreground" />
                {t("layout.sidebar.profile")}
              </Link>
              <Link
                href="/account/profile?view=expressions"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                {t("layout.sidebar.expressions")}
              </Link>
              {isAdmin && (
                <Link
                  href="/account/profile?view=users"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <Users className="h-4 w-4 text-muted-foreground" />
                  {t("layout.sidebar.users")}
                </Link>
              )}

              <Separator className="my-2" />

              <button
                onClick={() => {
                  setOpen(false)
                  signOut({ callbackUrl: "/" })
                }}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <LogOut className="h-4 w-4 text-muted-foreground" />
                {t("layout.sidebar.signOut")}
              </button>
            </>
          )}

          {!meLoading && !me && (
            <>
              <Separator className="my-2" />
              <Link
                href="/auth/signin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <LogIn className="h-4 w-4 text-muted-foreground" />
                {t("layout.sidebar.signIn")}
              </Link>
            </>
          )}

          <Separator className="my-2" />

          <div className="flex items-center gap-2 px-3 py-2">
            <SelectLocale compact sx={{ flex: 1 }} />
            <ColorSchemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileDrawer
