import { FC, useState, useMemo } from "react"
import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import { useUpdateUserMutation } from "@/hooks/useMe"
import { MeFragmentFragment, UpdateUserInput } from "@@/generated/graphql"
import ImageInput from "./components/imageInput"
import NameInput from "./components/nameInput"
import EmailInput from "./components/emailInput"
import BioInput from "./components/bioInput"
import SelectSingleLocation from "@/ui/Autocomplete/selectSingleLocation"
import Card from "@/ui/Card"
import { useTranslation } from "next-i18next"

type EditProfileState = {
  name?: string
  bio?: string
  image?: string
  country?: string
  canton?: string
}

const MyProfile: FC<{ me: MeFragmentFragment }> = ({ me }) => {
  const { t } = useTranslation("common", { keyPrefix: "auth.profile" })
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
        title={t("title")}
        description={t("description")}
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
              title={t("name")}
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
          title={t("email")}
          value={me.email}
          onChange={(_email) => {
            // updateProfile((prev) => ({ ...prev, email }))
          }}
          disabled
        />
        <SelectSingleLocation
          id="country"
          mode="country"
          label={t("country")}
          value={
            editProfileState.country !== undefined
              ? editProfileState.country
              : me.country
          }
          onChange={(country) => onChange("country", country)}
        />
        {(me.country === "CH" && editProfileState.country === undefined) || // render canton select element if me.country is "CH" profile does not have a "country" key at all
        editProfileState.country === "CH" ? (
          <SelectSingleLocation
            id="canton"
            mode="canton"
            label={t("canton")}
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
          title={t("bio")}
          helperText={t("bioHelperText")}
          value={
            editProfileState?.bio !== undefined ? editProfileState?.bio : me.bio
          }
          onChange={(bio) => onChange("bio", bio)}
        />
      </Card>
    </form>
  )
}

export default MyProfile
