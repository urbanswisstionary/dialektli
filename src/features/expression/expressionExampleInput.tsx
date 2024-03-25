import { useRef, type FC, useState } from "react"
import Box from "@mui/joy/Box"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import Typography from "@mui/joy/Typography"
import Textarea from "@mui/joy/Textarea"
import ChipDelete from "@mui/joy/ChipDelete"
import Button from "@mui/joy/Button"
import { useTranslation } from "next-i18next"
import Stack from "@mui/joy/Stack"

export const exampleMaxLength = 440

interface ExpressionExampleInputProps
  extends Omit<FormControlProps, "value" | "onChange"> {
  exampleNumber?: number
  exampleContent?: string
  onClose?: () => void
  onSave?: (_content: string) => void
  onSaveLoading?: boolean
}

const ExpressionExampleInput: FC<ExpressionExampleInputProps> = ({
  exampleContent = "",
  exampleNumber,
  onClose,
  onSave,
  onSaveLoading,
  ...formControlProps
}) => {
  const { t } = useTranslation("common")
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [content, setContent] = useState<string>(() => exampleContent)

  return (
    <FormControl {...formControlProps}>
      <Textarea
        sx={{ paddingTop: 0 }}
        size="lg"
        minRows={3}
        maxRows={8}
        value={content}
        onChange={({ currentTarget }) => setContent(currentTarget.value)}
        startDecorator={
          <Box
            display="flex"
            justifyContent="space-between"
            onClick={() => textareaRef.current?.focus()}
          >
            <Typography
              level="body-sm"
              textColor={
                formControlProps.disabled
                  ? "neutral.plainDisabledColor"
                  : "text.tertiary"
              }
              sx={{ userSelect: "none" }}
            >
              {exampleNumber}
            </Typography>
            <ChipDelete
              disabled={formControlProps.disabled}
              onDelete={() => setContent("")}
              slotProps={{
                root: {
                  title: t("expression.editExpression.deleteExample"),
                  onFocus: () => textareaRef.current?.focus(),
                },
              }}
            />
          </Box>
        }
        slotProps={{
          textarea: {
            ref: textareaRef,
            sx: {
              paddingInlineEnd: "calc(2.5 * var(--Textarea-paddingInline))",
            },
            maxLength: exampleMaxLength,
          },
          startDecorator: {
            sx: {
              display: "flex",
              flexDirection: "column",
              height: "12px",
              position: "relative",
              top: "8px",
              right: "2px",
            },
          },
        }}
        endDecorator={
          <Stack direction="row" gap={1}>
            <Button
              disabled={content.trim() === exampleContent}
              onClick={() => {
                if (onSave) onSave(content.trim())
              }}
              loading={onSaveLoading}
              variant="outlined"
            >
              {t("actions.save")}
            </Button>
            <Button
              disabled={
                onSaveLoading || (!onClose && content.trim() === exampleContent)
              }
              onClick={() => {
                setContent(exampleContent)
                if (onClose && content.trim() === exampleContent) onClose()
                textareaRef.current?.blur()
              }}
              color="neutral"
              variant="outlined"
            >
              {t(
                `actions.${onClose && content.trim() === exampleContent ? "close" : "cancel"}`,
              )}
            </Button>
          </Stack>
        }
      />
    </FormControl>
  )
}

export default ExpressionExampleInput
