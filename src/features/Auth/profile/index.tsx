import { FC, useState, useMemo } from "react"
import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import { useDeleteUserMutation, useUpdateUserMutation } from "@/hooks/useMe"
import { MeFragmentFragment, UpdateUserInput } from "@@/generated/graphql"
import ImageInput from "./components/imageInput"
import NameInput from "./components/nameInput"
import EmailInput from "./components/emailInput"
import BioInput from "./components/bioInput"
import SelectSingleLocation from "@/ui/Autocomplete/selectSingleLocation"
import Card from "@/ui/Card"
import { useTranslation, Trans } from "next-i18next"
import ConfirmDeleteModal from "@/ui/modals/confirmDelete"
import { signOut } from "next-auth/react"

type EditProfileState = {
  name?: string
  bio?: string
  image?: string
  country?: string
  canton?: string
}

const MyProfile: FC<{ me: MeFragmentFragment }> = ({ me }) => {
  const { t } = useTranslation("common")
  const { updateUser, loading: updateUserLoading } = useUpdateUserMutation()
  const { deleteUser, loading: deleteUserLoading } = useDeleteUserMutation()
  const [editProfileState, setEditProfileState] = useState<EditProfileState>({})
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

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
        title={t("auth.profile.title")}
        description={t("auth.profile.description")}
        actions={{
          save: {
            type: "submit",
            disabled: !changesFound,
            loading: updateUserLoading,

            title: t("actions.save"),
          },
          cancel: {
            disabled: !changesFound || updateUserLoading,
            onClick: () => setEditProfileState({}),
          },
          delete: {
            onClick: () => setOpenDeleteConfirmation(true),
            title: t("auth.profile.deleteAccount"),
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
              title={t("auth.profile.name")}
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
          title={t("auth.profile.email")}
          value={me.email}
          onChange={(_email) => {
            // updateProfile((prev) => ({ ...prev, email }))
          }}
          disabled
        />
        <SelectSingleLocation
          id="country"
          mode="country"
          label={t("auth.profile.country")}
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
            label={t("auth.profile.canton")}
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
          title={t("auth.profile.bio")}
          helperText={t("auth.profile.bioHelperText")}
          value={
            editProfileState?.bio !== undefined ? editProfileState?.bio : me.bio
          }
          onChange={(bio) => onChange("bio", bio)}
        />
      </Card>
      <ConfirmDeleteModal
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        loading={deleteUserLoading}
        onDelete={() => {
          deleteUser({ userId: me.id }, () => {
            setOpenDeleteConfirmation(false)
            signOut({ callbackUrl: "/" })
          })
        }}
        dialogContent={
          <Trans
            i18nKey={"auth.profile.deleteAccountConfirmation"}
            components={{ bold: <b /> }}
          />
        }
      />
    </form>
  )
}

export default MyProfile
