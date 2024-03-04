import { useRef, type FC } from "react"
import Box from "@mui/joy/Box"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Typography from "@mui/joy/Typography"
import FormHelperText from "@mui/joy/FormHelperText"
import Textarea from "@mui/joy/Textarea"
import ChipDelete from "@mui/joy/ChipDelete"
import IconButton from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"
import { useTranslation } from "next-i18next"
import Stack from "@mui/joy/Stack"

const WordExamplesInput: FC<{
  values: string[]
  onChange: (_values: string[]) => void
  disabled?: boolean
  label?: string
  helperText?: string
}> = ({ values, onChange, disabled, label, helperText }) => {
  const { t } = useTranslation("common", { keyPrefix: "term.editTerm" })
  return (
    <Stack pt={1}>
      {label ? (
        <FormLabel
          sx={{
            color: disabled
              ? "var(--joy-palette-neutral-plainDisabledColor)"
              : undefined,
          }}
        >
          {label}
        </FormLabel>
      ) : null}
      {helperText ? (
        <FormHelperText
          sx={{
            py: 1,
            color: disabled
              ? "var(--joy-palette-neutral-plainDisabledColor)"
              : undefined,
          }}
        >
          {helperText}
        </FormHelperText>
      ) : null}
      {values.map((example, i) => (
        <WordExampleInput
          key={i}
          sx={{ pb: 2 }}
          value={example}
          onChange={(example) => {
            const newExamples = [...values]
            newExamples[i] = example
            onChange(newExamples)
          }}
          onDelete={() => {
            const newExamples = [...values]
            newExamples.splice(i, 1)
            onChange(newExamples.length ? newExamples : [""])
          }}
          exampleNumber={i + 1}
          disabled={disabled}
        />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          px: 1.5,
        }}
      >
        <IconButton
          title={t("addExample")}
          variant="outlined"
          color="neutral"
          size="md"
          disabled={values.length > 2 || disabled}
          onClick={() => onChange([...values, ""])}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Stack>
  )
}

export default WordExamplesInput

const WordExampleInput: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string
    onChange: (_value: string) => void
    onDelete: () => void
    exampleNumber: number
  }
> = ({ value, onChange, onDelete, exampleNumber, ...formControlProps }) => {
  const { t } = useTranslation("common", { keyPrefix: "term.editTerm" })
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  return (
    <FormControl {...formControlProps}>
      <Textarea
        sx={{ paddingTop: 0 }}
        size="lg"
        minRows={3}
        maxRows={8}
        value={value}
        onChange={({ currentTarget }) => onChange(currentTarget.value)}
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
              onDelete={() => {
                onDelete()
                textareaRef.current?.blur()
              }}
              slotProps={{
                root: {
                  title: t("deleteExample"),
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
            maxLength: 440,
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
      />
    </FormControl>
  )
}
