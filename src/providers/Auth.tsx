import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { FC, PropsWithChildren } from "react"

export type AuthProviderProps = {
  session: Session
}
const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
  session,
}) => <SessionProvider session={session}>{children}</SessionProvider>

export default AuthProvider
