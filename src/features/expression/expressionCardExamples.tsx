import { useState, type FC } from "react"
import ListItem from "@mui/joy/ListItem"
import { useTranslation } from "next-i18next"
import { getFragmentData } from "@@/generated"
import {
  ExpressionExampleFragment,
  useCreateExpressionExampleMutation,
} from "@/hooks/useExpressions"
import Box from "@mui/joy/Box"
import { ExpressionFragmentFragment } from "@@/generated/graphql"
import ListDivider from "@mui/joy/ListDivider/ListDivider"
import ExpressionExampleInput from "./expressionExampleInput"
import { useMe } from "@/hooks/useUsers"
import ExpressionExampleListItem from "./expressionExampleListItem"
import FormHelperText from "@mui/joy/FormHelperText"
import { useRouter } from "next/router"
import ExpressionCardAddExampleButton, {
  ExpressionCardAddExampleButtonProps,
} from "./expressionCardAddExamplesButton"
import ExpressionCardContentList from "./expressionCardList"

type ExpressionCardExamplesProps = {
  expression: ExpressionFragmentFragment
  disabled?: boolean
  addExampleButtonProps?: Pick<
    ExpressionCardAddExampleButtonProps,
    "type" | "sx"
  >
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
    <ExpressionCardContentList disabled={disabled} label={`${t("examples")}:`}>
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
            exampleNumber={examples.length + 1}
            disabled={loadingCreateExpressionExample}
            onClose={() => setNewExampleDefinition(false)}
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
        <ExpressionCardAddExampleButton
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
    </ExpressionCardContentList>
  )
}

export default ExpressionCardExamples
