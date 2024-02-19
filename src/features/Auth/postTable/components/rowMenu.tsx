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
import type { AdminPostFragmentFragment } from "@@/generated/graphql"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import { useDeletePostMutation, useUpdatePostMutations } from "@/hooks/usePosts"
import CircularProgress from "@mui/joy/CircularProgress"

const RowMenu: FC<{ post: AdminPostFragmentFragment }> = ({ post }) => {
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const { deletePost, loading: deletePostLoading } = useDeletePostMutation()
  const { updatePost, loading: updatePostLoading } = useUpdatePostMutations()
  const publishOrUpublishHandler = useCallback(
    () =>
      updatePost({
        id: post.id,
        published: !post.published,
      }),
    [post.id, post.published, updatePost],
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
          <MenuItem component={Link} href={`/post/edit/${post.id}`}>
            Edit
          </MenuItem>

          <MenuItem
            sx={{ justifyContent: "space-between" }}
            onClick={publishOrUpublishHandler}
            disabled={updatePostLoading}
          >
            {post.published ? "Unpublish" : "Publish"}

            {updatePostLoading ? (
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
            disabled={deletePostLoading}
          >
            Delete
            <ListItemDecorator sx={{ color: "danger" }}>
              {deletePostLoading ? (
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
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete "{post.title}"?
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button
              variant="solid"
              color="danger"
              loading={deletePostLoading}
              onClick={() => {
                deletePost(post.id, () => {
                  setOpenDeleteConfirmation(false)
                })
              }}
            >
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpenDeleteConfirmation(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default RowMenu
