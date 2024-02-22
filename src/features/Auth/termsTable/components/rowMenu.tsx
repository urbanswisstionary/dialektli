import Divider from "@mui/joy/Divider"
import IconButton from "@mui/joy/IconButton"
import Menu from "@mui/joy/Menu"
import MenuButton from "@mui/joy/MenuButton"
import MenuItem from "@mui/joy/MenuItem"
import Dropdown from "@mui/joy/Dropdown"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"

import DialogTitle from "@mui/joy/DialogTitle"
import DialogContent from "@mui/joy/DialogContent"
import DialogActions from "@mui/joy/DialogActions"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
import DeleteForever from "@mui/icons-material/DeleteForever"
import WarningRoundedIcon from "@mui/icons-material/WarningRounded"
import Button from "@mui/joy/Button"
import { FC, useCallback, useState } from "react"
import Link from "next/link"
import type { AdminTermFragmentFragment } from "@@/generated/graphql"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import { useDeleteTermMutation, useUpdateTermMutations } from "@/hooks/useTerms"
import CircularProgress from "@mui/joy/CircularProgress"
import { useTranslation } from "next-i18next"

const RowMenu: FC<{ term: AdminTermFragmentFragment }> = ({ term }) => {
  const { t } = useTranslation("common", { keyPrefix: "actions" })
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const { deleteTerm, loading: deleteTermLoading } = useDeleteTermMutation()
  const { updateTerm, loading: updateTermLoading } = useUpdateTermMutations()
  const publishOrUpublishHandler = useCallback(
    () =>
      updateTerm({
        id: term.id,
        published: !term.published,
      }),
    [term.id, term.published, updateTerm],
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
          <MenuItem component={Link} href={`/term/edit/${term.id}`}>
            {t("edit")}
          </MenuItem>

          <MenuItem
            sx={{ justifyContent: "space-between" }}
            onClick={publishOrUpublishHandler}
            disabled={updateTermLoading}
          >
            {t(term.published ? "unpublish" : "publish")}
            {updateTermLoading ? (
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
            disabled={deleteTermLoading}
          >
            {t("delete")}
            <ListItemDecorator sx={{ color: "danger" }}>
              {deleteTermLoading ? (
                <CircularProgress size="sm" color="danger" />
              ) : (
                <DeleteForever />
              )}
            </ListItemDecorator>
          </MenuItem>
        </Menu>
      </Dropdown>
      <Modal
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            {t("confirmation")}
          </DialogTitle>
          <Divider />
          <DialogContent>
            {t("confirmDelete")} "{term.title}"?
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button
              variant="solid"
              color="danger"
              loading={deleteTermLoading}
              onClick={() => {
                deleteTerm(term.id, () => {
                  setOpenDeleteConfirmation(false)
                })
              }}
            >
              {t("delete")}
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpenDeleteConfirmation(false)}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default RowMenu
