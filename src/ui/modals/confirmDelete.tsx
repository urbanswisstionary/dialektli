import type { FC, ReactNode } from "react"
import Divider from "@mui/joy/Divider"
import DialogTitle from "@mui/joy/DialogTitle"
import DialogContent from "@mui/joy/DialogContent"
import DialogActions from "@mui/joy/DialogActions"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
import DeleteForever from "@mui/icons-material/DeleteForever"
import WarningRoundedIcon from "@mui/icons-material/WarningRounded"
import Button from "@mui/joy/Button"
import { useTranslation } from "next-i18next"

type ConfirmDeleteModalProps = {
  open: boolean
  onClose: () => void
  loading?: boolean
  onDelete?: () => void
  dialogContent?: ReactNode
}

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  dialogContent,
  open,
  onClose,
  loading,
  onDelete,
}) => {
  const { t } = useTranslation("common", { keyPrefix: "actions" })
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            {t("confirmation")}
          </DialogTitle>
          <Divider />
          {dialogContent ? (
            <DialogContent>{dialogContent}</DialogContent>
          ) : null}
          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button
              variant="solid"
              color="danger"
              loading={loading}
              onClick={() => {
                if (onDelete) onDelete()
              }}
              startDecorator={<DeleteForever />}
            >
              {t("delete")}
            </Button>
            <Button variant="plain" color="neutral" onClick={onClose}>
              {t("cancel")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default ConfirmDeleteModal
