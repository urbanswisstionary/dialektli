import { FC, FormEvent, useState } from "react"
import Box from "@mui/joy/Box"
import Button from "@/ui/Button"
import { useTranslation } from "next-i18next"
import {
  useUpdateUserMutation,
  useVerifyUserNameIsUniqueQuery,
} from "@/hooks/useUsers"
import { useRouter } from "next/router"
import NameInput from "./components/nameInput"

const WelcomeForm: FC<{ userId: string }> = ({ userId }) => {
  const router = useRouter()
  const { t } = useTranslation("common")
  const [name, setName] = useState("")

  const nameLengthChecked = name.length >= 3
  const { data, loading } = useVerifyUserNameIsUniqueQuery(
    { name },
    !nameLengthChecked,
  )
  const nameIsUnique = data?.verifyUserNameIsUnique

  const allowSubmit = nameLengthChecked && !loading && !!nameIsUnique
  const nameIsTaken =
    !nameLengthChecked || nameIsUnique === undefined ? false : !nameIsUnique

  const { updateUser } = useUpdateUserMutation()
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await updateUser({ id: userId, name }, () =>
      router.replace("/account/profile"),
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <NameInput
        required
        value={name}
        onChange={(name) => setName(name)}
        size="lg"
        title={t("auth.profile.name")}
        helperText={t(
          `auth.profile.welcome.${nameIsTaken ? "error" : "helperText"}`,
        )}
        error={nameIsTaken}
        color={allowSubmit ? "success" : undefined}
      />
      <Box sx={{ mt: 2 }}>
        <Button disabled={!allowSubmit} type="submit">
          {t("actions.submit")}
        </Button>
      </Box>
    </form>
  )
}

export default WelcomeForm
