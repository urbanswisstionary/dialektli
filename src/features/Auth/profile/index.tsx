import { FC, useState, useMemo } from "react"
import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import { useUpdateUserMutation } from "@/hooks/useMe"
import { MeFragmentFragment, UpdateUserInput } from "@@/generated/graphql"
import SelectLocation from "./components/selectLocation"
import ImageInput from "./components/imageInput"
import NameInput from "./components/nameInput"
import EmailInput from "./components/emailInput"
import BioInput from "./components/bioInput"
import Card from "@/ui/Card"

const MyProfile: FC<{ me: MeFragmentFragment }> = ({ me }) => {
  const { updateUser, loading: updateUserLoading } = useUpdateUserMutation()

  const [profile, updateProfile] = useState<Partial<MeFragmentFragment>>(
    me ?? {},
  )
  const changesFound = useMemo(() => {
    const updatedFields = Object.keys(profile) as (keyof MeFragmentFragment)[]
    if (!me || !updatedFields.length) return false
    return updatedFields.some((key) => profile[key] !== me[key])
  }, [profile, me])

  return (
    <>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 1 }}>
        <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
          My profile
        </Typography>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault()

          if (!changesFound) return
          const updateUserInput: UpdateUserInput = {
            id: me.id,
            name: profile.name,
            bio: profile.bio,
            image: profile.image,
            country: profile.country,
            canton: profile.canton,
          }
          updateUser(updateUserInput)
        }}
      >
        <Card
          title="Personal info"
          description="Customize how your profile information will apper to the networks."
          actions={{
            save: {
              type: "submit",
              disabled: !changesFound,
              loading: updateUserLoading,
            },
            cancel: {
              disabled: !changesFound || updateUserLoading,
              onClick: () => updateProfile({}),
            },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box>
              <ImageInput value={me.image} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <NameInput
                id="name"
                value={profile?.name ?? me.name}
                onChange={(name) =>
                  updateProfile((prev) => ({ ...prev, name }))
                }
              />
            </Box>
          </Stack>
          <EmailInput
            id="email"
            value={me.email}
            onChange={(_email) => {
              // updateProfile((prev) => ({ ...prev, email }))
            }}
            disabled
          />
          <SelectLocation
            id="country"
            mode="country"
            value={profile.country !== undefined ? profile.country : me.country}
            onChange={(country) =>
              updateProfile((prev) => ({ ...prev, country }))
            }
          />
          {(me.country === "CH" && profile.country === undefined) || // render canton select element if me.country is "CH" profile does not have a "country" key at all
          profile.country === "CH" ? (
            <SelectLocation
              id="canton"
              mode="canton"
              value={profile.canton !== undefined ? profile.canton : me.canton}
              onChange={(canton) =>
                updateProfile((prev) => ({ ...prev, canton }))
              }
            />
          ) : null}
          <BioInput
            id="bio"
            value={profile?.bio !== undefined ? profile?.bio : me.bio}
            onChange={(bio) => updateProfile((prev) => ({ ...prev, bio }))}
          />
        </Card>
      </form>
    </>
  )
}

export default MyProfile
