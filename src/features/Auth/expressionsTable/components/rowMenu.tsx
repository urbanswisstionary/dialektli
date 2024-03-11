import Divider from "@mui/joy/Divider"
import IconButton from "@mui/joy/IconButton"
import Menu from "@mui/joy/Menu"
import MenuButton from "@mui/joy/MenuButton"
import MenuItem from "@mui/joy/MenuItem"
import Dropdown from "@mui/joy/Dropdown"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"
import DeleteForever from "@mui/icons-material/DeleteForever"
import { FC, useCallback, useState } from "react"
import Link from "next/link"
import type { AdminExpressionFragmentFragment } from "@@/generated/graphql"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import {
  useDeleteExpressionMutation,
  useUpdateExpressionMutations,
} from "@/hooks/useExpressions"
import CircularProgress from "@mui/joy/CircularProgress"
import { useTranslation } from "next-i18next"
import ConfirmDeleteModal from "@/ui/modals/confirmDelete"

const RowMenu: FC<{ expression: AdminExpressionFragmentFragment }> = ({
  expression,
}) => {
  const { t } = useTranslation("common", { keyPrefix: "actions" })
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const { deleteExpression, loading: deleteExpressionLoading } =
    useDeleteExpressionMutation()
  const { updateExpression, loading: updateExpressionLoading } =
    useUpdateExpressionMutations()
  const publishOrUpublishHandler = useCallback(
    () =>
      updateExpression({
        id: expression.id,
        published: !expression.published,
      }),
    [expression.id, expression.published, updateExpression],
  )
  return (
    <>
      <Dropdown>
        <MenuButton
          slots={{
            root: IconButton,
          }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem component={Link} href={`/expression/${expression.id}/edit`}>
            {t("edit")}
          </MenuItem>

          <MenuItem
            sx={{ justifyContent: "space-between" }}
            onClick={publishOrUpublishHandler}
            disabled={updateExpressionLoading}
          >
            {t(expression.published ? "unpublish" : "publish")}
            {updateExpressionLoading ? (
              <ListItemDecorator>
                <CircularProgress size="sm" />
              </ListItemDecorator>
            ) : null}
          </MenuItem>

          <Divider />
          <MenuItem
            color="danger"
            sx={{ justifyContent: "space-between" }}
            onClick={() => setOpenDeleteConfirmation(true)}
            disabled={deleteExpressionLoading}
          >
            {t("delete")}
            <ListItemDecorator sx={{ color: "danger" }}>
              {deleteExpressionLoading ? (
                <CircularProgress size="sm" color="danger" />
              ) : (
                <DeleteForever />
              )}
            </ListItemDecorator>
          </MenuItem>
        </Menu>
      </Dropdown>
      <ConfirmDeleteModal
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        loading={deleteExpressionLoading}
        onDelete={() =>
          deleteExpression(expression.id, () =>
            setOpenDeleteConfirmation(false),
          )
        }
        dialogContent={`${t("confirmDelete")} ${expression.title}?`}
      />
    </>
  )
}

export default RowMenu
