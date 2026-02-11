import { getServerSession } from "next-auth"
import authConfig from "@@/auth.config"
import { redirect } from "next/navigation"
import { Box, Typography, Button, Paper } from "@mui/material"
import Link from "next/link"

export default async function TestAuthPage() {
  const session = await getServerSession(authConfig)

  if (!session?.user) {
    redirect("/de/auth/signin?callbackUrl=/de/test-auth")
  }

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Authentication Test
        </Typography>

        <Typography variant="h6" color="success.main" gutterBottom>
          ✅ Authentication Successful!
        </Typography>

        <Box sx={{ mt: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Session Data:
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ mt: 1, whiteSpace: "pre-wrap" }}
          >
            {JSON.stringify(session, null, 2)}
          </Typography>
        </Box>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Link href="/de" passHref legacyBehavior>
            <Button variant="contained">Go to Home</Button>
          </Link>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Note: Sign-out functionality requires additional implementation
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}
