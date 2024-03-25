import { useState, type FC } from "react"
import ListItem from "@mui/joy/ListItem"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import ListItemContent from "@mui/joy/ListItemContent"
import { useTranslation } from "next-i18next"
import {
  useDeleteExpressionExampleMutation,
  useUpdateExpressionExampleMutation,
} from "@/hooks/useExpressions"
import Typography from "@mui/joy/Typography"
import type { ExpressionExampleFragmentFragment } from "@@/generated/graphql"
import ExpressionExampleInput from "./expressionExampleInput"
import IconButton from "@mui/joy/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import ConfirmDeleteModal from "@/ui/modals/confirmDelete"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"
import Dropdown from "@mui/joy/Dropdown"
import Menu from "@mui/joy/Menu"
import MenuButton from "@mui/joy/MenuButton"
import MenuItem from "@mui/joy/MenuItem"
import DeleteForever from "@mui/icons-material/DeleteForever"
import Stack from "@mui/joy/Stack"
import Flag from "@/ui/Flag"

const ExpressionExampleListItem: FC<{
  preventEdit?: boolean
  example: ExpressionExampleFragmentFragment
  exampleNumber?: number
  editOnLoad?: boolean
}> = ({ preventEdit, example, exampleNumber, editOnLoad = false }) => {
  const { t } = useTranslation("common")
  const [editExampleContent, setEditExampleContent] = useState<boolean>(
    () => editOnLoad,
  )
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false)
  const { updateExpressionExample, loading: loadingUpdateExpressionExample } =
    useUpdateExpressionExampleMutation()
  const { deleteExpressionExample, loading: loadingDeleteExpressionExample } =
    useDeleteExpressionExampleMutation()
  return (
    <ListItem>
      {preventEdit ? null : (
        <ListItemDecorator>
          <Dropdown>
            <MenuButton
              disabled={preventEdit}
              slots={{ root: IconButton }}
              slotProps={{
                root: { variant: "outlined", color: "neutral", size: "sm" },
              }}
            >
              <MoreHorizRoundedIcon fontSize="small" />
            </MenuButton>
            <Menu
              size="sm"
              disablePortal
              keepMounted
              sx={{
                padding: 0,
                "> *": { pb: 0, pt: 0.75 },
                "> :first-child": { pt: 1 },
                "> :last-child": { pb: 1 },
              }}
            >
              <MenuItem
                title={t("actions.edit")}
                disabled={preventEdit}
                onClick={() => setEditExampleContent(true)}
              >
                <IconButton>
                  <EditIcon fontSize="small" />
                </IconButton>
              </MenuItem>

              <MenuItem
                color="danger"
                onClick={() => setOpenDeleteConfirmation(true)}
                disabled={loadingDeleteExpressionExample}
                title={t("actions.delete")}
              >
                <IconButton color="danger">
                  <DeleteForever />
                </IconButton>
              </MenuItem>
            </Menu>
          </Dropdown>
        </ListItemDecorator>
      )}
      {!editExampleContent ? (
        <ListItemContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography level="body-sm" sx={{ flex: 1 }}>
            {example.definition}
          </Typography>
          {example.cantons ? (
            <Stack direction="row" gap={1} flexWrap="wrap">
              {example.cantons.map((canton, i) => (
                <Flag key={i} mode="canton" code={canton} />
              ))}
            </Stack>
          ) : null}
        </ListItemContent>
      ) : (
        <ListItemContent>
          <ExpressionExampleInput
            exampleNumber={exampleNumber}
            exampleDefinition={example.definition}
            exampleCantons={example.cantons}
            disabled={
              loadingUpdateExpressionExample || loadingDeleteExpressionExample
            }
            onClose={() => setEditExampleContent(false)}
            onSave={(value) => {
              if (!value.definition.trim().length) {
                deleteExpressionExample(example.id, () =>
                  setEditExampleContent(false),
                )
              } else {
                updateExpressionExample(
                  {
                    definition: value.definition,
                    exampleId: example.id,
                    cantons: value.cantons,
                  },
                  () => setEditExampleContent(false),
                )
              }
            }}
            onSaveLoading={loadingUpdateExpressionExample}
          />
        </ListItemContent>
      )}
      <ConfirmDeleteModal
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        loading={loadingDeleteExpressionExample}
        onDelete={() => {
          deleteExpressionExample(example.id)
        }}
        dialogContent={`${t("actions.confirmDelete")}?`}
      />
    </ListItem>
  )
}

export default ExpressionExampleListItem
