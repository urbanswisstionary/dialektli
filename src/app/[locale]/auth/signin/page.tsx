"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignInPage() {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleOAuthSignIn = (provider: "google") => {
    signIn(provider, { callbackUrl })
  }

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn("credentials", {
      email,
      password,
      callbackUrl,
    })
  }

  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="max-w-[400px] w-full mx-2">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center mb-1">
            {t("auth.signinPage.title")}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {t("auth.signinPage.subtitle")}
          </p>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full bg-[#4285F4] hover:bg-[#357ae8] text-white"
              onClick={() => handleOAuthSignIn("google")}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t("auth.signinPage.withGoogle")}
            </Button>

            {isDevelopment && (
              <>
                <div className="relative my-2">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    {t("auth.signinPage.developmentOnly")}
                  </span>
                </div>
                <form onSubmit={handleCredentialsSignIn}>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t("auth.signinPage.email")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="test@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        {t("auth.signinPage.password")}
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        required
                      />
                    </div>
                    <Button type="submit" variant="outline" className="w-full">
                      {t("auth.signinPage.withTestAccount")}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {t("auth.signinPage.testCredentialsHint")}
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
