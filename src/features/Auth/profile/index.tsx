/* eslint-disable @next/next/no-img-element */
import * as React from "react"
import AspectRatio from "@mui/joy/AspectRatio"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import Input from "@mui/joy/Input"
// import IconButton from "@mui/joy/IconButton"
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
// import EditRoundedIcon from "@mui/icons-material/EditRounded"
import CountrySelector from "./countrySelector"
import useMe, { useUpdateUserMutation } from "@/hooks/useMe"
import { useRouter } from "next/router"
import { MeFragmentFragment, Role, UpdateUserInput } from "@@/generated/graphql"
import { isEqual } from "lodash"

const bioInputMaxLength = 220

export default function MyProfile() {
  const router = useRouter()
  const { updateUser } = useUpdateUserMutation()
  const myData = useMe()
  const [me, updateMyProfile] = React.useState<Partial<MeFragmentFragment>>(
    myData.me ?? {},
  )
  React.useEffect(() => {
    if (myData.me) updateMyProfile(myData.me)
  }, [myData.me])
  if (myData.loading) return <>Loading..</>
  if (!myData.loading && !me) {
    router.push("signin")
    return <>Redirecting..</>
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!me.id) return
        const updateUserInput: UpdateUserInput = {
          id: me.id,
          name: me.name,
          // email: me.email,
          bio: me.bio,
          // role: me.role,
          image: me.image,
          country: me.country,
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
                    {me?.image ? (
                      <img src={me.image} loading="lazy" alt="me" />
                    ) : (
                      <>no image</>
                    )}
                  </AspectRatio>
                  {/* <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton> */}
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
                      value={me?.name ?? ""}
                      onChange={({ currentTarget }) =>
                        updateMyProfile((prev) => ({
                          ...prev,
                          name: currentTarget.value ?? "",
                        }))
                      }
                    />
                  </FormControl>
                </Stack>
              </Stack>
              {me?.role && me.role === Role.Admin ? (
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Select
                    size="sm"
                    endDecorator={<BadgeIcon />}
                    value={me.role}
                    onChange={(_e, role) => {
                      if (role) updateMyProfile((prev) => ({ ...prev, role }))
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
                  value={me?.email}
                  onChange={({ currentTarget }) =>
                    updateMyProfile((prev) => ({
                      ...prev,
                      email: currentTarget.value ?? "",
                    }))
                  }
                  disabled
                />
              </FormControl>
              <div>
                <CountrySelector
                  value={me.country}
                  onChange={(countryCode) =>
                    updateMyProfile((prev) => ({
                      ...prev,
                      country: countryCode as string,
                    }))
                  }
                />
              </div>
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
                    value={me?.bio ?? ""}
                    slotProps={{ textarea: { maxLength: bioInputMaxLength } }}
                    onChange={({ currentTarget }) =>
                      updateMyProfile((prev) => ({
                        ...prev,
                        bio: currentTarget.value ?? "",
                      }))
                    }
                  />
                  <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
                    {bioInputMaxLength - (me?.bio?.length ?? 0)} character
                    {bioInputMaxLength - (me?.bio?.length ?? 0) === 1
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
                  disabled={isEqual(me, myData.me)}
                  onClick={() => updateMyProfile(myData.me ?? {})}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  disabled={isEqual(me, myData.me)}
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
