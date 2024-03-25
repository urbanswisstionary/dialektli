import type { FC } from "react"
import Button from "@mui/joy/Button"
import ButtonGroup from "@mui/joy/ButtonGroup"
import { ExpressionGender } from "@@/generated/graphql"
import { useTranslation } from "react-i18next"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"

export const expressionGenders = Object.values(ExpressionGender)

interface ExpressionGenderInputProps
  extends Omit<FormControlProps, "onChange"> {
  value?: ExpressionGender | null
  onChange?: (_gender?: ExpressionGender) => void
  label?: string
  helperText?: string
}

const ExpressionGenderInput: FC<ExpressionGenderInputProps> = ({
  value,
  onChange,
  label,
  helperText,
  ...props
}) => {
  const { t } = useTranslation("common", { keyPrefix: "expression" })

  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <ButtonGroup
        size="sm"
        disabled={props.disabled}
        color={props.error ? "danger" : "neutral"}
        aria-label={t("genderFieldHelperText")}
      >
        {expressionGenders.map((gender) => (
          <Button
            key={gender}
            variant={gender === value ? "solid" : undefined}
            onClick={() => {
              if (onChange) onChange(gender !== value ? gender : undefined)
            }}
          >
            {t(`genders.${gender}`)}
          </Button>
        ))}
      </ButtonGroup>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default ExpressionGenderInput
