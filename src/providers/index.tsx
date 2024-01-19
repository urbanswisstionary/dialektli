import { FC, PropsWithChildren } from "react"
import AuthProvider, { AuthProviderProps } from "./Auth"
import StylesProvider from "./Styles"
import HeadProvider from "./Head"
import ApolloClientProvider, { ApolloClientProviderProps } from "./Apollo"

export type ProviderProps = AuthProviderProps & ApolloClientProviderProps

const Providers: FC<PropsWithChildren<ProviderProps>> = ({
  children,
  session,
  apollo,
  router,
}) => (
  <>
    <ApolloClientProvider apollo={apollo} router={router}>
      <HeadProvider />
      <AuthProvider session={session}>
        <StylesProvider>{children}</StylesProvider>
      </AuthProvider>
    </ApolloClientProvider>
  </>
)

export default Providers
