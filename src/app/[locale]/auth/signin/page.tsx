"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import {
  Button,
  Box,
  Typography,
  Stack,
  Paper,
  TextField,
  Divider,
} from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import { useState } from "react"
import { useTranslations } from "next-intl"

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          mx: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t("auth.signinPage.title")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          {t("auth.signinPage.subtitle")}
        </Typography>
        <Stack spacing={2}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => handleOAuthSignIn("google")}
            sx={{
              bgcolor: "#4285F4",
              "&:hover": { bgcolor: "#357ae8" },
            }}
          >
            {t("auth.signinPage.withGoogle")}
          </Button>

          {isDevelopment && (
            <>
              <Divider sx={{ my: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  {t("auth.signinPage.developmentOnly")}
                </Typography>
              </Divider>
              <form onSubmit={handleCredentialsSignIn}>
                <Stack spacing={2}>
                  <TextField
                    label={t("auth.signinPage.email")}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="test@example.com"
                    fullWidth
                    required
                  />
                  <TextField
                    label={t("auth.signinPage.password")}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    fullWidth
                    required
                  />
                  <Button type="submit" variant="outlined" fullWidth>
                    {t("auth.signinPage.withTestAccount")}
                  </Button>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    align="center"
                  >
                    {t("auth.signinPage.testCredentialsHint")}
                  </Typography>
                </Stack>
              </form>
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  )
}
