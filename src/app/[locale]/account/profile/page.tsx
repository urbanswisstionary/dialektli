"use client"

import {
  useMe,
  useAdminUsersQuery,
  AdminUsersFragment,
  useUpdateUserMutation,
} from "@/hooks/useUsers"
import { useSearchParams } from "next/navigation"
import { useRouter } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import IconButton from "@mui/material/IconButton"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useState, useRef } from "react"
import { useExpressionsQuery } from "@/hooks/useExpressions"
import ExpressionCard from "@/components/expression/ExpressionCard"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"
import { getFragmentData } from "@/generated"
import type { ExpressionFragmentFragment } from "@/generated/graphql"
import { compressImageToBase64 } from "@/utils/imageCompression"

type ViewType = "profile" | "expressions" | "users"

export default function ProfilePage() {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { me, loading: loadingMe, isAdmin } = useMe()
  const { updateUser, loading: updatingUser } = useUpdateUserMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [editingBio, setEditingBio] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [bioValue, setBioValue] = useState("")

  const viewParam = searchParams.get("view") as ViewType | null
  const [activeView, setActiveView] = useState<ViewType>("profile")

  useEffect(() => {
    if (viewParam === "expressions" || viewParam === "users") {
      setActiveView(viewParam)
    } else {
      setActiveView("profile")
    }
  }, [viewParam])

  const { data: expressionsData, loading: loadingExpressions } =
    useExpressionsQuery({
      offset: 0,
      limit: 100,
      authorName: me?.name ?? undefined,
    })

  const { data: usersData, loading: loadingUsers } = useAdminUsersQuery()

  useEffect(() => {
    if (!loadingMe && !me) {
      router.push("/auth/signin")
    }
  }, [loadingMe, me, router])

  const handleViewChange = (
    _event: React.SyntheticEvent,
    newValue: ViewType,
  ) => {
    setActiveView(newValue)
    router.push(`/account/profile?view=${newValue}`)
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file || !me?.id) return

    try {
      setUploadingImage(true)
      const base64Image = await compressImageToBase64(file)
      await updateUser({ id: me.id, image: base64Image })
    } catch (error) {
      console.error("Failed to upload image:", error)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleEditName = () => {
    setNameValue(me?.name ?? "")
    setEditingName(true)
  }

  const handleSaveName = async () => {
    if (!me?.id || !nameValue.trim()) return
    try {
      await updateUser({ id: me.id, name: nameValue.trim() })
      setEditingName(false)
    } catch (error) {
      console.error("Failed to update name:", error)
    }
  }

  const handleCancelName = () => {
    setEditingName(false)
    setNameValue("")
  }

  const handleEditBio = () => {
    setBioValue(me?.bio ?? "")
    setEditingBio(true)
  }

  const handleSaveBio = async () => {
    if (!me?.id) return
    try {
      await updateUser({ id: me.id, bio: bioValue.trim() || null })
      setEditingBio(false)
    } catch (error) {
      console.error("Failed to update bio:", error)
    }
  }

  const handleCancelBio = () => {
    setEditingBio(false)
    setBioValue("")
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

  const expressions = expressionsData?.expressionsQuery?.expressions ?? []
  const users = usersData?.adminUsers?.users ?? []

  return (
    <Stack spacing={3} sx={{ py: 3 }}>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box position="relative">
              <Avatar
                src={me.image ?? undefined}
                alt={me.name ?? me.email ?? "User"}
                sx={{ width: 80, height: 80 }}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "primary.main",
                  color: "white",
                  width: 32,
                  height: 32,
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
              >
                {uploadingImage ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <PhotoCamera sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </Box>
            <Stack spacing={1} flex={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {editingName ? (
                  <>
                    <TextField
                      size="small"
                      value={nameValue}
                      onChange={(e) => setNameValue(e.target.value)}
                      autoFocus
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={handleSaveName}
                      disabled={updatingUser || !nameValue.trim()}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={handleCancelName}
                      disabled={updatingUser}
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant="h5">{me.name ?? me.email}</Typography>
                    <IconButton size="small" onClick={handleEditName}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Stack>
              {editingBio ? (
                <Stack direction="row" alignItems="flex-start" spacing={1}>
                  <TextField
                    size="small"
                    multiline
                    rows={2}
                    value={bioValue}
                    onChange={(e) => setBioValue(e.target.value)}
                    autoFocus
                    sx={{ flex: 1 }}
                    placeholder={t("auth.profile.bioPlaceholder")}
                  />
                  <IconButton
                    size="small"
                    onClick={handleSaveBio}
                    disabled={updatingUser}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={handleCancelBio}
                    disabled={updatingUser}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    {me.bio || t("auth.profile.noBio")}
                  </Typography>
                  <IconButton size="small" onClick={handleEditBio}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Stack>
              )}
              <Stack direction="row" spacing={2}>
                {me.canton && (
                  <Typography variant="caption" color="text.secondary">
                    {t("auth.profile.canton")}: {me.canton}
                  </Typography>
                )}
                {me.country && (
                  <Typography variant="caption" color="text.secondary">
                    {t("auth.profile.country")}: {me.country}
                  </Typography>
                )}
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="caption">
                  {t("actions.like")}: {me.likesCount ?? 0}
                </Typography>
                <Typography variant="caption">
                  {t("actions.dislike")}: {me.dislikesCount ?? 0}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeView} onChange={handleViewChange}>
          <Tab label={t("layout.sidebar.profile")} value="profile" />
          <Tab label={t("layout.sidebar.expressions")} value="expressions" />
          {isAdmin && <Tab label={t("layout.sidebar.users")} value="users" />}
        </Tabs>
      </Box>

      {activeView === "profile" && (
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">
                {t("auth.profile.statistics")}
              </Typography>
              <Stack direction="row" spacing={4}>
                <Box>
                  <Typography variant="h4" color="primary">
                    {me.myPublishedExpressionsCount ?? 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("auth.profile.publishedExpressions")}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {me.myUnpublishedExpressionsCount ?? 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("auth.profile.unpublishedExpressions")}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}

      {activeView === "expressions" && (
        <Stack spacing={2}>
          {loadingExpressions ? (
            <Stack alignItems="center" sx={{ my: 5 }}>
              <CircularProgress size={60} />
            </Stack>
          ) : expressions.length > 0 ? (
            expressions.map((expression: ExpressionFragmentFragment) => (
              <ExpressionCard
                key={expression.id}
                expression={expression}
                disableActions={false}
              />
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              {t("auth.profile.noExpressionsFound")}
            </Typography>
          )}
        </Stack>
      )}

      {activeView === "users" && isAdmin && (
        <Stack spacing={2}>
          {loadingUsers ? (
            <Stack alignItems="center" sx={{ my: 5 }}>
              <CircularProgress size={60} />
            </Stack>
          ) : users.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("auth.profile.tableHeaders.name")}</TableCell>
                    <TableCell>
                      {t("auth.profile.tableHeaders.email")}
                    </TableCell>
                    <TableCell>{t("auth.profile.tableHeaders.role")}</TableCell>
                    <TableCell>
                      {t("auth.profile.tableHeaders.canton")}
                    </TableCell>
                    <TableCell align="right">
                      {t("auth.profile.tableHeaders.expressions")}
                    </TableCell>
                    <TableCell align="right">
                      {t("auth.profile.tableHeaders.likes")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {
                    const userData = getFragmentData(AdminUsersFragment, user)
                    return (
                      <TableRow key={userData.id}>
                        <TableCell>{userData.name ?? "-"}</TableCell>
                        <TableCell>{userData.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={userData.role}
                            size="small"
                            color={
                              userData.role === "ADMIN" ? "error" : "default"
                            }
                          />
                        </TableCell>
                        <TableCell>{userData.canton ?? "-"}</TableCell>
                        <TableCell align="right">
                          {(userData.publishedExpressionsCount ?? 0) +
                            (userData.unpublishedExpressionsCount ?? 0)}
                        </TableCell>
                        <TableCell align="right">
                          {userData.likesCount ?? 0}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              {t("auth.profile.noUsersFound")}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  )
}
