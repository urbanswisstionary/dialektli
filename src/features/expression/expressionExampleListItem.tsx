import { useState, type FC } from "react"
import ListItem from "@mui/joy/ListItem"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import ListItemContent from "@mui/joy/ListItemContent"
import { useTranslation } from "next-i18next"
import {
  useDeleteTermExampleMutation,
  useUpdateTermExampleMutation,
} from "@/hooks/useTerms"
import Typography from "@mui/joy/Typography"
import { TermExampleFragmentFragment } from "@@/generated/graphql"
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

const ExpressionExampleListItem: FC<{
  preventEdit?: boolean
  example: TermExampleFragmentFragment
  exampleNumber?: number
  editOnLoad?: boolean
}> = ({ preventEdit, example, exampleNumber, editOnLoad = false }) => {
  const { t } = useTranslation("common")
  const [editExampleContent, setEditExampleContent] = useState<boolean>(
    () => editOnLoad,
  )
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false)
  const { updateTermExample, loading: loadingUpdateTermExample } =
    useUpdateTermExampleMutation()
  const { deleteTermExample, loading: loadingDeleteTermExample } =
    useDeleteTermExampleMutation()
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
                disabled={loadingDeleteTermExample}
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
        <ListItemContent>
          <Typography level="body-sm">{example.content}</Typography>
        </ListItemContent>
      ) : (
        <ListItemContent>
          <ExpressionExampleInput
            exampleNumber={exampleNumber}
            exampleContent={example.content}
            disabled={loadingUpdateTermExample || loadingDeleteTermExample}
            onCancel={() => setEditExampleContent(false)}
            onSave={(content) => {
              if (!content.trim().length) {
                deleteTermExample(example.id, () =>
                  setEditExampleContent(false),
                )
              } else {
                updateTermExample({ content, exampleId: example.id }, () =>
                  setEditExampleContent(false),
                )
              }
            }}
            onSaveLoading={loadingUpdateTermExample}
          />
        </ListItemContent>
      )}
      <ConfirmDeleteModal
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        loading={loadingDeleteTermExample}
        onDelete={() => {
          deleteTermExample(example.id)
        }}
        dialogContent={`${t("actions.confirmDelete")}?`}
      />
    </ListItem>
  )
}

export default ExpressionExampleListItem
