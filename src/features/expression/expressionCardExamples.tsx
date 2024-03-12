import { useState, type FC } from "react"
import List from "@mui/joy/List"
import ListSubHeader from "@mui/joy/ListSubheader"
import ListItem from "@mui/joy/ListItem"
import { useTranslation } from "next-i18next"
import { getFragmentData } from "@@/generated"
import {
  ExpressionExampleFragment,
  useCreateExpressionExampleMutation,
} from "@/hooks/useExpressions"
import Box, { BoxProps } from "@mui/joy/Box"
import { ExpressionFragmentFragment } from "@@/generated/graphql"
import JoyLink from "@mui/joy/Link"
import ListDivider from "@mui/joy/ListDivider/ListDivider"
import ExpressionExampleInput from "./expressionExampleInput"
import { useMe } from "@/hooks/useUsers"
import ExpressionExampleListItem from "./expressionExampleListItem"
import FormHelperText from "@mui/joy/FormHelperText"
import IconButton from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"
import { useRouter } from "next/router"

type ExpressionCardExamplesProps = {
  expression: ExpressionFragmentFragment
  disabled?: boolean
  addExampleButtonProps?: {
    type?: AddExampleProps["type"]
    sx?: BoxProps["sx"]
  }
}

const ExpressionCardExamples: FC<ExpressionCardExamplesProps> = ({
  expression,
  addExampleButtonProps = { type: "link" },
  disabled,
}) => {
  const router = useRouter()
  const { me, isAdmin } = useMe()
  const { t } = useTranslation("common", { keyPrefix: "expression" })
  const examples = getFragmentData(
    ExpressionExampleFragment,
    expression.examples,
  )
  const [newExampleContent, setNewExampleDefinition] = useState<boolean>(false)
  const { createExpressionExample, loading: loadingCreateExpressionExample } =
    useCreateExpressionExampleMutation()

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
            disabled={loadingCreateExpressionExample}
            onCancel={() => setNewExampleDefinition(false)}
            onSave={(definition) => {
              if (!definition.trim().length) {
                setNewExampleDefinition(false)
              } else {
                createExpressionExample(
                  { definition, expressionId: expression.id },
                  () => setNewExampleDefinition(false),
                )
              }
            }}
            onSaveLoading={loadingCreateExpressionExample}
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
      {expression.examples.length ? <ListDivider /> : null}
      <ListItem>
        <AddExample
          onClick={() => {
            if (!me)
              router.push(
                `account/signin?redirect=/expression/${expression.id}`,
              )
            else setNewExampleDefinition(true)
          }}
          disabled={disabled || newExampleContent}
          loading={loadingCreateExpressionExample}
          type={addExampleButtonProps?.type}
          sx={addExampleButtonProps?.sx}
        />
      </ListItem>
    </List>
  )
}

export default ExpressionCardExamples

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
  const { t } = useTranslation("common", { keyPrefix: "expression" })
  return (
    <Box
      sx={[
        { width: "100%", display: "flex" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {type === "link" ? (
        <JoyLink
          level="title-sm"
          fontWeight={600}
          onClick={onClick}
          disabled={disabled || loading}
          title={t("editExpression.addExample")}
        >
          {t("suggestExample")}
        </JoyLink>
      ) : (
        <IconButton
          title={t("editExpression.addExample")}
          variant="outlined"
          color="neutral"
          size="md"
          disabled={disabled}
          loading={loading}
          onClick={onClick}
        >
          <AddIcon />
        </IconButton>
      )}
    </Box>
  )
}
