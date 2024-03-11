import { FC, PropsWithChildren } from "react"
import AuthProvider, { AuthProviderProps } from "./Auth"
import StylesProvider from "./Styles"
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
      <AuthProvider session={session}>
        <StylesProvider>{children}</StylesProvider>
      </AuthProvider>
    </ApolloClientProvider>
  </>
)

export default Providers
