import type { FC } from "react"
import List, { ListProps } from "@mui/joy/List"
import ListSubheader, { listSubheaderClasses } from "@mui/joy/ListSubheader"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItem, { listItemClasses } from "@mui/joy/ListItem"
import Typography from "@mui/joy/Typography"

export type Guideline = { title: string; description?: string }

interface GuidelinesListProps extends ListProps {
  mode: "dos" | "dont's"
  guiedlines?: Guideline[]
}
const GuidelinesList: FC<GuidelinesListProps> = ({
  mode,
  guiedlines,
  sx,
  ...props
}) => (
  <List
    sx={[
      {
        flex: "unset",
        gap: 0.25,
        [`& .${listItemClasses.root}`]: {
          borderLeftStyle: "solid",
          borderLeftColor: `${mode === "dos" ? "success" : "danger"}.plainColor`,
          borderLeftWidth: 5,
          "*:first-letter": { textTransform: "capitalize" },
        },
        [`& .${listSubheaderClasses.root}`]: {
          borderBottomStyle: "solid",
          borderBottomColor: `${mode === "dos" ? "success" : "danger"}.outlinedBorder`,
          borderBottomWidth: 1,
          marginBottom: 1,
        },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...props}
  >
    <ListSubheader sx={{ fontWeight: "bold" }}>{mode}</ListSubheader>
    {(Array.isArray(guiedlines) ? guiedlines : []).map((guideline, i) => (
      <ListItem key={i}>
        <ListItemContent>
          <Typography level="title-sm">{guideline.title}</Typography>
          <Typography level="body-sm">{guideline.description}</Typography>
        </ListItemContent>
      </ListItem>
    ))}
  </List>
)
export default GuidelinesList
