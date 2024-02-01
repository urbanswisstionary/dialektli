/* eslint-disable @next/next/no-img-element */
import { FC, useState, useEffect } from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"

import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import Card from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import { useMe, useUpdateUserMutation } from "@/hooks/useMe"
import { useRouter } from "next/router"
import { MeFragmentFragment, Role, UpdateUserInput } from "@@/generated/graphql"
import { isEqual } from "lodash"
import SelectLocation from "./components/selectLocation"
import ImageInput from "./components/imageInput"
import NameInput from "./components/nameInput"
import RoleInput from "./components/roleInput"
import EmailInput from "./components/emailInput"
import BioInput from "./components/bioInput"

const MyProfile: FC = () => {
  const router = useRouter()
  const { updateUser, loading: updateUserIsLoading } = useUpdateUserMutation()

  const { me, loading: meLoading } = useMe()
  const [profile, updateProfile] = useState<Partial<MeFragmentFragment>>(
    me ?? {},
  )
  useEffect(() => {
    if (me) updateProfile(me)
  }, [me])
  if (meLoading) return <>Loading..</>

  if (!meLoading && !profile) {
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
      {/* <Box sx={{ flex: 1, width: "100%" }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "background.body",
            // zIndex: 9995,
          }}
        > */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 1 }}>
        <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
          My profile
        </Typography>
      </Box>
      {/* </Box> */}
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
              Customize how your profile information will apper to the networks.
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
                <ImageInput value={profile?.image} />
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <NameInput
                  name={profile?.name}
                  onChange={(name) =>
                    updateProfile((prev) => ({ ...prev, name }))
                  }
                />
              </Stack>
            </Stack>
            {profile?.role && profile.role === Role.Admin ? (
              <RoleInput
                role={profile.role}
                onChange={(role) =>
                  updateProfile((prev) => ({ ...prev, role }))
                }
              />
            ) : null}
            <EmailInput
              email={profile?.email ?? ""}
              onChange={(email) =>
                updateProfile((prev) => ({ ...prev, email }))
              }
            />
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
            {profile.country === "CH" ? (
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
            ) : null}
            <BioInput
              bio={profile?.bio ?? ""}
              onChange={(bio) => updateProfile((prev) => ({ ...prev, bio }))}
            />
          </Stack>

          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                disabled={isEqual(profile, me) || updateUserIsLoading}
                onClick={() => updateProfile(me ?? {})}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="solid"
                disabled={isEqual(profile, me)}
                loading={updateUserIsLoading}
                type="submit"
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
      {/* </Box> */}
    </form>
  )
}

export default MyProfile
