import { useState, type FC } from "react"
import List from "@mui/joy/List"
import ListSubHeader from "@mui/joy/ListSubheader"
import ListItem from "@mui/joy/ListItem"
import { useTranslation } from "next-i18next"
import { getFragmentData } from "@@/generated"
import {
  TermExampleFragment,
  useCreateTermExampleMutation,
} from "@/hooks/useTerms"
import Box, { BoxProps } from "@mui/joy/Box"
import { TermFragmentFragment } from "@@/generated/graphql"
import JoyLink from "@mui/joy/Link"
import ListDivider from "@mui/joy/ListDivider/ListDivider"
import ExpressionExampleInput from "./expressionExampleInput"
import { useMe } from "@/hooks/useUsers"
import ExpressionExampleListItem from "./expressionExampleListItem"
import FormHelperText from "@mui/joy/FormHelperText"
import IconButton from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"

type TermCardExamplesProps = {
  term: TermFragmentFragment
  disabled?: boolean
  addExampleButtonProps?: {
    type?: AddExampleProps["type"]
    sx?: BoxProps["sx"]
  }
}

const TermCardExamples: FC<TermCardExamplesProps> = ({
  term,
  addExampleButtonProps = { type: "link" },
  disabled,
}) => {
  const { me, isAdmin } = useMe()
  const { t } = useTranslation("common", { keyPrefix: "term" })
  const examples = getFragmentData(TermExampleFragment, term.examples)
  const [newExampleContent, setNewExampleContent] = useState<boolean>(false)
  const { createTermExample, loading: loadingCreateTermExample } =
    useCreateTermExampleMutation()

  return (
    <List
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <ListSubHeader
        sx={{
          borderBottom: "1.5px solid",
          borderColor: "divider",
          pb: 1,
          mb: 1,
          display: "block",
          color: disabled
            ? "var(--joy-palette-neutral-plainDisabledColor)"
            : undefined,
        }}
      >
        {t("examples")}:
      </ListSubHeader>
      {examples.map((example, i) => (
        <ExpressionExampleListItem
          key={example.id}
          exampleNumber={i + 1}
          example={example}
          preventEdit={
            isAdmin
              ? false
              : !me || !example.authorId || me.id !== example.authorId
          }
        />
      ))}
      {newExampleContent ? (
        <Box pt={1}>
          <ExpressionExampleInput
            disabled={loadingCreateTermExample}
            onCancel={() => setNewExampleContent(false)}
            onSave={(content) => {
              if (!content.trim().length) {
                setNewExampleContent(false)
              } else {
                createTermExample({ content, termId: term.id }, () =>
                  setNewExampleContent(false),
                )
              }
            }}
            onSaveLoading={loadingCreateTermExample}
          />
          <FormHelperText
            sx={{
              py: 1,
              color: disabled
                ? "var(--joy-palette-neutral-plainDisabledColor)"
                : undefined,
            }}
          >
            {t("examplesFieldHelperText")}
          </FormHelperText>
        </Box>
      ) : null}
      {term.examples.length ? <ListDivider /> : null}
      <ListItem>
        <AddExample
          onClick={() => setNewExampleContent(true)}
          disabled={disabled || newExampleContent}
          loading={loadingCreateTermExample}
          type={addExampleButtonProps?.type}
          sx={addExampleButtonProps?.sx}
        />
      </ListItem>
    </List>
  )
}

export default TermCardExamples

type AddExampleProps = {
  type?: "iconButton" | "link"
  disabled?: boolean
  onClick: () => void
  loading?: boolean
  sx?: BoxProps["sx"]
}
const AddExample: FC<AddExampleProps> = ({
  disabled,
  onClick,
  loading,
  type,
  sx,
}) => {
  const { t } = useTranslation("common", { keyPrefix: "term" })
  if (type === "link")
    return (
      <Box
        sx={[
          { width: "100%", display: "flex" },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <JoyLink
          level="title-sm"
          fontWeight={600}
          onClick={onClick}
          disabled={disabled || loading}
        >
          {t("suggestExample")}
        </JoyLink>
      </Box>
    )

  if (type === "iconButton")
    return (
      <Box
        sx={[
          { width: "100%", display: "flex" },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <IconButton
          title={t("editTerm.addExample")}
          variant="outlined"
          color="neutral"
          size="md"
          disabled={disabled}
          loading={loading}
          onClick={onClick}
        >
          <AddIcon />
        </IconButton>
      </Box>
    )
  return null
}
