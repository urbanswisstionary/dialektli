"use client"

import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  useMe,
  useUpdateUserMutation,
  useVerifyUserNameIsUniqueQuery,
} from "@/hooks/useUsers"
import { useRouter } from "@/i18n/navigation"

export default function WelcomePage() {
  const t = useTranslations()
  const router = useRouter()
  const { me, loading: loadingMe } = useMe()
  const { updateUser, loading: updating } = useUpdateUserMutation()

  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const { data: verifyData } = useVerifyUserNameIsUniqueQuery(
    { name },
    !name || name.length < 3,
  )

  useEffect(() => {
    if (!loadingMe && !me) {
      router.push("/auth/signin")
    }
  }, [loadingMe, me, router])

  useEffect(() => {
    if (!loadingMe && me?.name) {
      router.push("/account/profile")
    }
  }, [loadingMe, me, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (name.length < 3) {
      setError(t("auth.profile.welcome.helperText"))
      return
    }

    if (verifyData && !verifyData.verifyUserNameIsUnique) {
      setError(t("auth.profile.welcome.error"))
      return
    }

    try {
      if (!me?.id) return
      await updateUser({ id: me.id, name })
      router.push("/account/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update name")
    }
  }

  if (loadingMe) {
    return (
      <div className="my-10 flex items-center justify-center">
        <Loader2 className="h-15 w-15 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!me) {
    return null
  }

  return (
    <div className="flex items-center justify-center py-10">
      <Card className="w-full max-w-125">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <h1 className="text-center text-2xl font-bold">
              {t("auth.profile.welcome.title")}
            </h1>
            <p className="text-center text-base text-muted-foreground">
              {t("auth.profile.welcome.description")}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="name">
                    {t("auth.profile.name")}
                    <span className="ml-1 text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setError("")
                    }}
                    required
                  />
                  <p
                    className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {error || t("auth.profile.welcome.helperText")}
                  </p>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={updating || name.length < 3}
                >
                  {updating ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    t("actions.submit")
                  )}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
