"use client"

import {
  useMe,
  useUpdateUserMutation,
  useVerifyUserNameIsUniqueQuery,
} from "@/hooks/useUsers"
import { useRouter } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import { useEffect, useState } from "react"

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
      <Stack alignItems="center" sx={{ my: 5 }}>
        <CircularProgress size={60} />
      </Stack>
    )
  }

  if (!me) {
    return null
  }

  return (
    <Stack alignItems="center" sx={{ py: 5 }}>
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h4" align="center">
              {t("auth.profile.welcome.title")}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              {t("auth.profile.welcome.description")}
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label={t("auth.profile.name")}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setError("")
                  }}
                  error={!!error}
                  helperText={error || t("auth.profile.welcome.helperText")}
                  autoFocus
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={updating || name.length < 3}
                >
                  {updating ? (
                    <CircularProgress size={24} />
                  ) : (
                    t("actions.submit")
                  )}
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
