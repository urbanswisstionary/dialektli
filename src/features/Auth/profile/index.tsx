/* eslint-disable @next/next/no-img-element */
import { FC, useState, useEffect } from "react"
import AspectRatio from "@mui/joy/AspectRatio"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import Input from "@mui/joy/Input"
import Textarea from "@mui/joy/Textarea"
import Stack from "@mui/joy/Stack"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import Typography from "@mui/joy/Typography"
import Card from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"
import BadgeIcon from "@mui/icons-material/Badge"
import useMe, { useUpdateUserMutation } from "@/hooks/useMe"
import { useRouter } from "next/router"
import { MeFragmentFragment, Role, UpdateUserInput } from "@@/generated/graphql"
import { isEqual } from "lodash"
import SelectLocation from "./SelectLocation"

const bioInputMaxLength = 220

export default function MyProfile() {
  const router = useRouter()
  const { updateUser } = useUpdateUserMutation()
  const me = useMe()
  const [profile, updateProfile] = useState<Partial<MeFragmentFragment>>(
    me.me ?? {},
  )
  useEffect(() => {
    if (me.me) updateProfile(me.me)
  }, [me.me])
  if (me.loading) return <>Loading..</>
  console.log("me", me)

  if (!me.loading && !profile) {
    router.push("/account/signin")
    return <>Redirecting..</>
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!profile.id) return
        const updateUserInput: UpdateUserInput = {
          id: profile.id,
          name: profile.name,
          bio: profile.bio,
          image: profile.image,
          country: profile.country,
          canton: profile.canton,
        }
        updateUser(updateUserInput)
      }}
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "background.body",
            zIndex: 9995,
          }}
        >
          <Box sx={{ px: { xs: 2, md: 6 }, py: 1 }}>
            <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
              My profile
            </Typography>
          </Box>
        </Box>
        <Stack
          spacing={4}
          sx={{
            display: "flex",
            maxWidth: "800px",
            mx: "auto",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Personal info</Typography>
              <Typography level="body-sm">
                Customize how your profile information will apper to the
                networks.
              </Typography>
            </Box>
            <Divider />
            <Stack
              direction="column"
              spacing={2}
              sx={{ display: { xs: "flex" }, my: 1 }}
            >
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1}>
                  <AspectRatio
                    ratio="1"
                    maxHeight={108}
                    sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                  >
                    {profile?.image ? (
                      <img src={profile.image} loading="lazy" alt="me" />
                    ) : (
                      <>no image</>
                    )}
                  </AspectRatio>
                </Stack>
                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{
                      display: {
                        sm: "flex-column",
                        md: "flex-row",
                      },
                      gap: 2,
                    }}
                  >
                    <Input
                      size="sm"
                      placeholder="Name"
                      value={profile?.name ?? ""}
                      onChange={({ currentTarget }) =>
                        updateProfile((prev) => ({
                          ...prev,
                          name: currentTarget.value ?? "",
                        }))
                      }
                    />
                  </FormControl>
                </Stack>
              </Stack>
              {profile?.role && profile.role === Role.Admin ? (
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Select
                    size="sm"
                    endDecorator={<BadgeIcon />}
                    value={profile.role}
                    onChange={(_e, role) => {
                      if (role) updateProfile((prev) => ({ ...prev, role }))
                    }}
                  >
                    {Object.entries(Role).map(([key, value]) => (
                      <Option key={key} value={value}>
                        {key}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Email</FormLabel>
                <Input
                  size="sm"
                  type="email"
                  endDecorator={<EmailRoundedIcon />}
                  sx={{ flexGrow: 1 }}
                  placeholder="email"
                  value={profile?.email}
                  onChange={({ currentTarget }) =>
                    updateProfile((prev) => ({
                      ...prev,
                      email: currentTarget.value ?? "",
                    }))
                  }
                  disabled
                />
              </FormControl>
              <Stack gap={2}>
                <div>
                  <SelectLocation
                    mode="country"
                    value={profile.country}
                    onChange={(countryCode) =>
                      updateProfile((prev) => ({
                        ...prev,
                        country: countryCode as string,
                      }))
                    }
                  />
                </div>
                {profile.country === "CH" ? (
                  <div>
                    <SelectLocation
                      mode="canton"
                      value={profile.canton}
                      onChange={(cantonCode) =>
                        updateProfile((prev) => ({
                          ...prev,
                          canton: cantonCode as string,
                        }))
                      }
                    />
                  </div>
                ) : null}
              </Stack>
              <div>
                <CardOverflow>
                  <Box>
                    <Typography level="title-md">Bio</Typography>
                    <Typography level="body-sm">
                      Write a short introduction to be displayed on your profile
                    </Typography>
                  </Box>
                  <Textarea
                    size="sm"
                    minRows={4}
                    sx={{ mt: 1.5 }}
                    value={profile?.bio ?? ""}
                    slotProps={{ textarea: { maxLength: bioInputMaxLength } }}
                    onChange={({ currentTarget }) =>
                      updateProfile((prev) => ({
                        ...prev,
                        bio: currentTarget.value ?? "",
                      }))
                    }
                  />
                  <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
                    {bioInputMaxLength - (profile?.bio?.length ?? 0)} character
                    {bioInputMaxLength - (profile?.bio?.length ?? 0) === 1
                      ? ""
                      : "s"}{" "}
                    left
                  </FormHelperText>
                </CardOverflow>
              </div>
            </Stack>

            <CardOverflow
              sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  disabled={isEqual(profile, me.me)}
                  onClick={() => updateProfile(me.me ?? {})}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  disabled={isEqual(profile, me.me)}
                  type="submit"
                >
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>
        </Stack>
      </Box>
    </form>
  )
}
