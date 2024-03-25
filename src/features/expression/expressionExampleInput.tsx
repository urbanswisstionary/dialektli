import { useRef, type FC, useState } from "react"
import Box from "@mui/joy/Box"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import Typography from "@mui/joy/Typography"
import Textarea from "@mui/joy/Textarea"
import ChipDelete from "@mui/joy/ChipDelete"
import Button from "@mui/joy/Button"
import { useTranslation } from "next-i18next"
import Stack from "@mui/joy/Stack"
import SelectMultipleLocation from "@/ui/Autocomplete/selectMultipleLocations"
import isEqual from "lodash/isEqual"

export const exampleMaxLength = 440

interface ExpressionExampleInputProps
  extends Omit<FormControlProps, "value" | "onChange"> {
  exampleNumber?: number
  exampleDefinition?: string
  exampleCantons?: string[]
  onClose?: () => void
  onSave?: (_example: { definition: string; cantons: string[] }) => void
  onSaveLoading?: boolean
}

const ExpressionExampleInput: FC<ExpressionExampleInputProps> = ({
  exampleDefinition = "",
  exampleCantons = [],
  exampleNumber,
  onClose,
  onSave,
  onSaveLoading,
  ...formControlProps
}) => {
  const { t } = useTranslation("common")
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [definition, setDefinition] = useState<string>(() => exampleDefinition)
  const [cantons, setCantons] = useState<string[]>(() => exampleCantons)

  const changesFound =
    definition.trim() !== exampleDefinition || !isEqual(cantons, exampleCantons)
  return (
    <>
      <SelectMultipleLocation
        mode="canton"
        value={cantons}
        onChange={(cantons) => setCantons(cantons ?? [])}
        groupOptions
      />
      <FormControl {...formControlProps}>
        <Textarea
          sx={{ paddingTop: 0 }}
          size="lg"
          minRows={3}
          maxRows={8}
          value={definition}
          onChange={({ currentTarget }) => setDefinition(currentTarget.value)}
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
                onDelete={() => setDefinition("")}
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
                disabled={!changesFound}
                onClick={() => {
                  if (onSave)
                    onSave({ definition: definition.trim(), cantons: cantons })
                }}
                loading={onSaveLoading}
                variant="outlined"
              >
                {t("actions.save")}
              </Button>
              <Button
                disabled={onSaveLoading || (!onClose && !changesFound)}
                onClick={() => {
                  setDefinition(exampleDefinition)
                  setCantons(exampleCantons)
                  if (onClose && !changesFound) onClose()
                  textareaRef.current?.blur()
                }}
                color="neutral"
                variant="outlined"
              >
                {t(`actions.${onClose && !changesFound ? "close" : "cancel"}`)}
              </Button>
            </Stack>
          }
        />
      </FormControl>
    </>
  )
}

export default ExpressionExampleInput
