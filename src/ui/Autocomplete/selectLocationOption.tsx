import AutocompleteOption, {
  AutocompleteOptionProps,
} from "@mui/joy/AutocompleteOption"
import AspectRatio from "@mui/joy/AspectRatio"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import type { FC } from "react"
import Flag from "@/ui/Flag"

const SelectLocationOption: FC<
  AutocompleteOptionProps & {
    mode: "canton" | "country"
    label: string
    flagCode: string
  }
> = ({ mode, label, flagCode, ...props }) => (
  <AutocompleteOption {...props}>
    <ListItemDecorator>
      <AspectRatio ratio="1" sx={{ minWidth: 20, borderRadius: "50%" }}>
        <Flag mode={mode} code={flagCode} />
      </AspectRatio>
    </ListItemDecorator>
    {label}
  </AutocompleteOption>
)

export default SelectLocationOption
