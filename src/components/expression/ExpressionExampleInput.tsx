"use client"

import { useRef, type FC, useState } from "react"
import Box from "@mui/material/Box"
import FormControl, { FormControlProps } from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import { useTranslations } from "next-intl"
import SelectMultipleLocation from "@/components/ui/Autocomplete/SelectMultipleLocation"
import isEqual from "lodash/isEqual"

export const exampleMaxLength = 440

interface ExpressionExampleInputProps extends Omit<
  FormControlProps,
  "value" | "onChange"
> {
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
  const t = useTranslations()
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
      <FormControl {...formControlProps} fullWidth>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
          onClick={() => textareaRef.current?.focus()}
        >
          <Typography
            variant="caption"
            sx={{
              color: formControlProps.disabled
                ? "action.disabled"
                : "text.secondary",
              userSelect: "none",
            }}
          >
            {exampleNumber}
          </Typography>
          <IconButton
            size="small"
            disabled={formControlProps.disabled}
            onClick={() => setDefinition("")}
            title={t("expression.editExpression.deleteExample")}
            onFocus={() => textareaRef.current?.focus()}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <TextField
          inputRef={textareaRef}
          multiline
          minRows={3}
          maxRows={8}
          value={definition}
          onChange={({ currentTarget }) => setDefinition(currentTarget.value)}
          inputProps={{
            maxLength: exampleMaxLength,
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {`${definition.length}/${exampleMaxLength}`}
                  </Typography>
                </InputAdornment>
              ),
            },
          }}
        />
        <Stack direction="row" gap={1} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            disabled={onSaveLoading || !changesFound}
            onClick={() => {
              if (onSave)
                onSave({ definition: definition.trim(), cantons: cantons })
            }}
          >
            {t("actions.save")}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            disabled={onSaveLoading || (!onClose && !changesFound)}
            onClick={() => {
              setDefinition(exampleDefinition)
              setCantons(exampleCantons)
              if (onClose && !changesFound) onClose()
              textareaRef.current?.blur()
            }}
          >
            {t(`actions.${onClose && !changesFound ? "close" : "cancel"}`)}
          </Button>
        </Stack>
      </FormControl>
    </>
  )
}

export default ExpressionExampleInput
