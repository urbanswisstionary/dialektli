"use client"

import { useState } from "react"
import { graphql } from "@/generated"
import { Language } from "@/generated/graphql"
import { useQuery } from "@apollo/client/react"
import { SwitzerlandMap } from "@/components/maps/SwitzerlandMap"
import { getCantonName } from "@/config/cantons"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import CircularProgress from "@mui/material/CircularProgress"
import Chip from "@mui/material/Chip"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

const CantonOverviewQuery = graphql(/* GraphQL */ `
  query CantonOverview($language: Language) {
    cantonOverview(language: $language) {
      canton
      count
    }
  }
`)

const ExpressionsByCantonQuery = graphql(/* GraphQL */ `
  query ExpressionsByCanton(
    $canton: String!
    $language: Language
    $limit: Int
  ) {
    expressionsByCanton(canton: $canton, language: $language, limit: $limit) {
      id
      title
      language
    }
  }
`)

export default function SprachatlasPage() {
  const t = useTranslations()
  const locale = useLocale()

  const [selectedCanton, setSelectedCanton] = useState<string | null>(null)
  const [language, setLanguage] = useState<Language | "">("")

  const { data: overviewData, loading: loadingOverview } = useQuery(
    CantonOverviewQuery,
    {
      variables: {
        language: language || null,
      },
    },
  )

  const { data: expressionsData, loading: loadingExpressions } = useQuery(
    ExpressionsByCantonQuery,
    {
      variables: {
        canton: selectedCanton ?? "",
        language: language || null,
        limit: 20,
      },
      skip: !selectedCanton,
    },
  )

  const cantonOverview = overviewData?.cantonOverview ?? []
  const highlightedCantons = cantonOverview.map((c) => c.canton)
  const expressions = expressionsData?.expressionsByCanton ?? []

  const selectedCantonData = selectedCanton
    ? cantonOverview.find((c) => c.canton === selectedCanton)
    : null

  const handleCantonClick = (cantonId: string) => {
    setSelectedCanton((prev) => (prev === cantonId ? null : cantonId))
  }

  const validLocales: readonly string[] = ["de", "fr", "it", "en"]
  const mapLocale = validLocales.includes(locale)
    ? (locale as "de" | "fr" | "it" | "en")
    : "de"

  return (
    <Stack sx={{ mt: 2, mb: 3, gap: 3 }}>
      <Typography variant="h4" component="h1">
        {t("layout.sidebar.sprachatlas")}
      </Typography>

      <FormControl sx={{ maxWidth: 200 }}>
        <InputLabel>{t("filterBy.language")}</InputLabel>
        <Select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value as Language | "")
            setSelectedCanton(null)
          }}
          label={t("filterBy.language")}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="DE">{t("selectLanguage.DE")}</MenuItem>
          <MenuItem value="FR">{t("selectLanguage.FR")}</MenuItem>
          <MenuItem value="IT">{t("selectLanguage.IT")}</MenuItem>
        </Select>
      </FormControl>

      {loadingOverview ? (
        <Stack alignItems="center" sx={{ my: 5 }}>
          <CircularProgress size={60} />
        </Stack>
      ) : (
        <Box sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
          <SwitzerlandMap
            highlightedCantons={highlightedCantons}
            onCantonClick={handleCantonClick}
            showLabels
            showAttribution
            height={500}
            width="100%"
            locale={mapLocale}
          />
        </Box>
      )}

      {selectedCanton && (
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h5">
              {getCantonName(selectedCanton, mapLocale)}
            </Typography>
            {selectedCantonData && (
              <Chip
                label={`${selectedCantonData.count} expression${selectedCantonData.count !== 1 ? "s" : ""}`}
                color="primary"
                variant="outlined"
              />
            )}
            <Chip
              label="Clear"
              onDelete={() => setSelectedCanton(null)}
              size="small"
            />
          </Stack>

          {loadingExpressions ? (
            <Stack alignItems="center" sx={{ my: 3 }}>
              <CircularProgress size={40} />
            </Stack>
          ) : expressions.length > 0 ? (
            <List disablePadding>
              {expressions.map((expr) => (
                <ListItem key={expr.id} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={`/expressions/${expr.id}` as "/expressions/[id]"}
                  >
                    <ListItemText
                      primary={expr.title}
                      secondary={expr.language}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No expressions found for this canton.
            </Typography>
          )}
        </Stack>
      )}

      {!selectedCanton && cantonOverview.length > 0 && (
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="text.secondary">
            {cantonOverview.length} cantons with expressions
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {cantonOverview.map((c) => (
              <Chip
                key={c.canton}
                label={`${getCantonName(c.canton, mapLocale)} (${c.count})`}
                onClick={() => handleCantonClick(c.canton)}
                variant="outlined"
                size="small"
              />
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
