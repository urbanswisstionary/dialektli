"use client"

import type { FC } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import FormControl, { FormControlProps } from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormHelperText from "@mui/material/FormHelperText"
import { ExpressionGender } from "@/generated/graphql"
import { useTranslations } from "next-intl"

export const expressionGenders = Object.values(ExpressionGender)

interface ExpressionGenderInputProps extends Omit<
  FormControlProps,
  "onChange"
> {
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
  disabled,
  error,
  ...props
}) => {
  const t = useTranslations()

  return (
    <FormControl disabled={disabled} error={error} {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Box sx={{ display: "inline-flex" }}>
        <ButtonGroup
          size="small"
          aria-label={t("expression.genderFieldHelperText")}
          disabled={disabled}
        >
          {expressionGenders.map((gender) => (
            <Button
              key={gender}
              variant={gender === value ? "contained" : "outlined"}
              onClick={() => {
                if (onChange) onChange(gender !== value ? gender : undefined)
              }}
              disabled={disabled}
            >
              {t(`expression.genders.${gender}`)}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default ExpressionGenderInput
