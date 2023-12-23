import type { Session } from "next-auth";
import { FC, PropsWithChildren } from "react";
import AuthProvider from "./Auth";
import StylesProvider from "./Styles";
import HeadProvider from "./Head";

type ProviderProps = PropsWithChildren<{
  session: Session;
}>;

const Providers: FC<ProviderProps> = ({ children, session }) => (
  <>
    <HeadProvider />
    <AuthProvider session={session}>
      <StylesProvider>{children}</StylesProvider>
    </AuthProvider>
  </>
);

export default Providers;
