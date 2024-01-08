import { CssVarsProvider } from "@mui/joy/styles"
import { FC, PropsWithChildren } from "react"
import GlobalStyles from "@mui/joy/GlobalStyles"
import CssBaseline from "@mui/joy/CssBaseline"

type StylesProviderProps = PropsWithChildren
const StylesProvider: FC<StylesProviderProps> = ({ children }) => (
  <>
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Auth-forms-breakpoint": "769px", // forms will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.3s", // set to `none` to disable transition

            "--background-color": "rgba(255 255 255 / 0.2)",
            "--background-color-dark": "#131318cc",
            "--Header-height": "52px",
            [theme.breakpoints.up("md")]: {
              "--Header-height": "0px",
            },
          },
          "*": {
            boxSizing: "border-box",
            padding: 0,
            margin: 0,
          },
          "html, body": {
            maxWidth: "100vw",
            overflowX: "hidden",
          },
          body: {
            background: "var(--background-color)",
          },
          a: {
            color: "inherit",
            textDecoration: "none",
          },
          [theme.getColorSchemeSelector("dark")]: {
            html: {
              colorScheme: "dark",
            },
            body: {
              background: "var(--background-color-dark)",
            },
          },
        })}
      />
      {children}
    </CssVarsProvider>
  </>
)

export default StylesProvider
