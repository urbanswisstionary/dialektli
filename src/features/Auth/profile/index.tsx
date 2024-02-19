import { FC, useState, useMemo } from "react"
import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import { useUpdateUserMutation } from "@/hooks/useMe"
import { MeFragmentFragment, UpdateUserInput } from "@@/generated/graphql"
import ImageInput from "./components/imageInput"
import NameInput from "./components/nameInput"
import EmailInput from "./components/emailInput"
import BioInput from "./components/bioInput"
import SelectLocation from "@/features/Auth/profile/components/selectLocation"
import Card from "@/ui/Card"

type EditProfileState = {
  name?: string
  bio?: string
  image?: string
  country?: string
  canton?: string
}

const MyProfile: FC<{ me: MeFragmentFragment }> = ({ me }) => {
  const { updateUser, loading: updateUserLoading } = useUpdateUserMutation()
  const [editProfileState, setEditProfileState] = useState<EditProfileState>({})

  const changesFound = useMemo(() => {
    const updatedFields = Object.keys(
      editProfileState,
    ) as (keyof EditProfileState)[]
    if (!me || !updatedFields.length) return false
    return updatedFields.some((key) => editProfileState[key] !== me[key])
  }, [editProfileState, me])

  const onChange = <K extends keyof EditProfileState>(
    key: K,
    value: EditProfileState[K] | null,
  ) => setEditProfileState((prev) => ({ ...prev, [key]: value }))

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
            name: editProfileState.name,
            bio: editProfileState.bio,
            image: editProfileState.image,
            country: editProfileState.country,
            canton: editProfileState.canton,
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
              onClick: () => setEditProfileState({}),
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
                value={
                  editProfileState?.name !== undefined
                    ? editProfileState?.name
                    : me.name
                }
                onChange={(name) => onChange("name", name)}
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
            value={
              editProfileState.country !== undefined
                ? editProfileState.country
                : me.country
            }
            onChange={(country) => onChange("country", country)}
          />
          {(me.country === "CH" && editProfileState.country === undefined) || // render canton select element if me.country is "CH" profile does not have a "country" key at all
          editProfileState.country === "CH" ? (
            <SelectLocation
              id="canton"
              mode="canton"
              value={
                editProfileState.canton !== undefined
                  ? editProfileState.canton
                  : me.canton
              }
              onChange={(canton) => onChange("canton", canton)}
            />
          ) : null}
          <BioInput
            id="bio"
            value={
              editProfileState?.bio !== undefined
                ? editProfileState?.bio
                : me.bio
            }
            onChange={(bio) => onChange("bio", bio)}
          />
        </Card>
      </form>
    </>
  )
}

export default MyProfile
