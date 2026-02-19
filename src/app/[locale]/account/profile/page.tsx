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
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Check, X, Loader2, Bookmark } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import {
  useExpressionsQuery,
  useMyBookmarksQuery,
} from "@/hooks/useExpressions"
import ExpressionCard from "@/components/expression/ExpressionCard"
import { getFragmentData } from "@/generated"
import type { ExpressionFragmentFragment } from "@/generated/graphql"

type ViewType = "profile" | "expressions" | "favorites" | "users"

export default function ProfilePage() {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { me, loading: loadingMe, isAdmin } = useMe()
  const { updateUser, loading: updatingUser } = useUpdateUserMutation()
  const [editingName, setEditingName] = useState(false)
  const [editingBio, setEditingBio] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [bioValue, setBioValue] = useState("")

  const viewParam = searchParams.get("view") as ViewType | null

  const activeView = useMemo(() => {
    const validViews = ["profile", "expressions", "favorites", "users"]

    if (validViews.includes(viewParam)) return viewParam
    else return "profile"
  }, [viewParam])

  const { data: expressionsData, loading: loadingExpressions } =
    useExpressionsQuery({
      offset: 0,
      limit: 100,
      authorName: me?.name ?? undefined,
    })

  const { data: usersData, loading: loadingUsers } = useAdminUsersQuery()

  const { data: bookmarksData, loading: loadingBookmarks } =
    useMyBookmarksQuery()

  useEffect(() => {
    if (!loadingMe && !me) {
      router.push("/auth/signin")
    }
  }, [loadingMe, me, router])

  const handleViewChange = (newValue: string) => {
    router.push(`/account/profile?view=${newValue}`)
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
      // eslint-disable-next-line no-console
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
      <div className="flex items-center justify-center my-10">
        <Loader2 className="h-15 w-15 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!me) {
    return null
  }

  const expressions = expressionsData?.expressionsQuery?.expressions ?? []
  const users = usersData?.adminUsers?.users ?? []
  const bookmarks = bookmarksData?.myBookmarks?.expressions ?? []

  const initials = (me.name ?? me.email ?? "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex flex-col gap-6 py-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-row gap-6 items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={me.image ?? undefined}
                alt={me.name ?? me.email ?? "User"}
              />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2">
                {editingName ? (
                  <>
                    <Input
                      value={nameValue}
                      onChange={(e) => setNameValue(e.target.value)}
                      autoFocus
                      className="flex-1 h-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleSaveName}
                      disabled={updatingUser || !nameValue.trim()}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleCancelName}
                      disabled={updatingUser}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">
                      {me.name ?? me.email}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleEditName}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </>
                )}
              </div>
              {editingBio ? (
                <div className="flex items-start gap-2">
                  <Textarea
                    value={bioValue}
                    onChange={(e) => setBioValue(e.target.value)}
                    autoFocus
                    className="flex-1"
                    rows={2}
                    placeholder={t("auth.profile.bioPlaceholder")}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleSaveBio}
                    disabled={updatingUser}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCancelBio}
                    disabled={updatingUser}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {me.bio || t("auth.profile.noBio")}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleEditBio}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
              <div className="flex gap-4">
                {me.canton && (
                  <span className="text-xs text-muted-foreground">
                    {t("auth.profile.canton")}: {me.canton}
                  </span>
                )}
                {me.country && (
                  <span className="text-xs text-muted-foreground">
                    {t("auth.profile.country")}: {me.country}
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                <span className="text-xs">
                  {t("actions.like")}: {me.likesCount ?? 0}
                </span>
                <span className="text-xs">
                  {t("actions.dislike")}: {me.dislikesCount ?? 0}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeView} onValueChange={handleViewChange}>
        <TabsList>
          <TabsTrigger value="profile">
            {t("layout.sidebar.profile")}
          </TabsTrigger>
          <TabsTrigger value="expressions">
            {t("layout.sidebar.expressions")}
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Bookmark className="h-4 w-4 mr-1" />
            {t("layout.sidebar.favorites")}
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="users">{t("layout.sidebar.users")}</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">
                  {t("auth.profile.statistics")}
                </h3>
                <div className="flex gap-8">
                  <div>
                    <p className="text-3xl font-bold text-primary">
                      {me.myPublishedExpressionsCount ?? 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("auth.profile.publishedExpressions")}
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-amber-500">
                      {me.myUnpublishedExpressionsCount ?? 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("auth.profile.unpublishedExpressions")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expressions">
          <div className="flex flex-col gap-4">
            {loadingExpressions ? (
              <div className="flex items-center justify-center my-10">
                <Loader2 className="h-15 w-15 animate-spin text-muted-foreground" />
              </div>
            ) : expressions.length > 0 ? (
              expressions.map((expression: ExpressionFragmentFragment) => (
                <ExpressionCard
                  key={expression.id}
                  expression={expression}
                  disableActions={false}
                />
              ))
            ) : (
              <p className="text-base text-muted-foreground text-center">
                {t("auth.profile.noExpressionsFound")}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="flex flex-col gap-4">
            {loadingBookmarks ? (
              <div className="flex items-center justify-center my-10">
                <Loader2 className="h-15 w-15 animate-spin text-muted-foreground" />
              </div>
            ) : bookmarks.length > 0 ? (
              bookmarks.map((expression: ExpressionFragmentFragment) => (
                <ExpressionCard
                  key={expression.id}
                  expression={expression}
                  disableActions={false}
                />
              ))
            ) : (
              <p className="text-base text-muted-foreground text-center">
                {t("auth.profile.noFavoritesFound")}
              </p>
            )}
          </div>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="users">
            <div className="flex flex-col gap-4">
              {loadingUsers ? (
                <div className="flex items-center justify-center my-10">
                  <Loader2 className="h-15 w-15 animate-spin text-muted-foreground" />
                </div>
              ) : users.length > 0 ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {t("auth.profile.tableHeaders.name")}
                        </TableHead>
                        <TableHead>
                          {t("auth.profile.tableHeaders.email")}
                        </TableHead>
                        <TableHead>
                          {t("auth.profile.tableHeaders.role")}
                        </TableHead>
                        <TableHead>
                          {t("auth.profile.tableHeaders.canton")}
                        </TableHead>
                        <TableHead className="text-right">
                          {t("auth.profile.tableHeaders.expressions")}
                        </TableHead>
                        <TableHead className="text-right">
                          {t("auth.profile.tableHeaders.likes")}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => {
                        const userData = getFragmentData(
                          AdminUsersFragment,
                          user,
                        )
                        return (
                          <TableRow key={userData.id}>
                            <TableCell>{userData.name ?? "-"}</TableCell>
                            <TableCell>{userData.email}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  userData.role === "ADMIN"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {userData.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{userData.canton ?? "-"}</TableCell>
                            <TableCell className="text-right">
                              {(userData.publishedExpressionsCount ?? 0) +
                                (userData.unpublishedExpressionsCount ?? 0)}
                            </TableCell>
                            <TableCell className="text-right">
                              {userData.likesCount ?? 0}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <p className="text-base text-muted-foreground text-center">
                  {t("auth.profile.noUsersFound")}
                </p>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
