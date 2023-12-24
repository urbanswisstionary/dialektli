import { CssVarsProvider } from "@mui/joy/styles";
import { FC, PropsWithChildren } from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";

type StylesProviderProps = PropsWithChildren;
const StylesProvider: FC<StylesProviderProps> = ({ children }) => (
  <>
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Auth-forms-breakpoint": "769px", // forms will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.3s", // set to `none` to disable transition

            "--background-color": "rgba(255 255 255 / 0.2)",
            "--background-color-dark": "#131318cc",
          },
        }}
      />
      {children}
    </CssVarsProvider>
  </>
);

export default StylesProvider;
