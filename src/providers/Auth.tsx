import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

type AuthProviderProps = PropsWithChildren<{
  session: Session;
}>;
const AuthProvider: FC<AuthProviderProps> = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default AuthProvider;
