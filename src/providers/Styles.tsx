import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles"
import type { FC, PropsWithChildren } from "react"
import GlobalStyles from "@mui/joy/GlobalStyles"
import CssBaseline from "@mui/joy/CssBaseline"
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles"

const materialTheme = materialExtendTheme()

type StylesProviderProps = PropsWithChildren
const StylesProvider: FC<StylesProviderProps> = ({ children }) => (
  <>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider disableTransitionOnChange>
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
              "--Header-height": "3rem",
              "--Header-padding-left": "0px",
              [theme.breakpoints.up("md")]: {
                "--Header-padding-left": "0px",
              },
              "--Sidebar-width": "15rem",
              [theme.breakpoints.up("lg")]: {
                "--Sidebar-width": "20rem",
              },
              "--main-padding": "1rem",
            },
            "*": {
              boxSizing: "border-box",
              padding: 0,
              margin: 0,
              scrollBehavior: "smooth",
            },
            "html, body": {
              width: "100%",
              height: "100%",
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
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  </>
)

export default StylesProvider
