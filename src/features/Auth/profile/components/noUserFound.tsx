import type { FC } from "react"

import Link from "@mui/joy/Link"
import NextLink from "next/link"
import { Trans } from "next-i18next"

const NoUserFound: FC = () => (
  <Trans
    i18nKey={"auth.profile.noUserFound"}
    components={[
      <Link key="linkToSignIn" component={NextLink} href={"/account/signin"} />,
    ]}
  />
)

export default NoUserFound
