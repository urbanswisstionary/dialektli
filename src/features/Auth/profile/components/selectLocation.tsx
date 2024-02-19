import Autocomplete from "@mui/joy/Autocomplete"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import { FC, useMemo } from "react"
import FormHelperText from "@mui/joy/FormHelperText"
import Flag from "@/ui/Flag"
import SelectLocationOption from "./selectLocationOption"

type LocationOption = {
  code: string
  label: string
}

const SelectLocation: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string | null | undefined
    onChange: (_locationCode: string | null) => void
    mode: "canton" | "country"
    helperText?: string
    label?: string | false
  }
> = ({ value, onChange, mode, label, helperText, sx, ...props }) => {
  const options = useMemo(() => getOptions(mode), [mode])
  const valueIndex = useMemo(
    () => options.findIndex((c) => c.code === value),
    [value, options],
  )
  if (!mode) return null
  return (
    <div>
      <FormControl
        {...props}
        sx={[
          { display: { sm: "contents" } },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {label !== false ? (
          <FormLabel sx={{ textTransform: "capitalize" }}>
            {label ?? mode}
          </FormLabel>
        ) : null}
        <Autocomplete
          size="sm"
          autoHighlight
          isOptionEqualToValue={(option, value) => option.code === value?.code}
          value={valueIndex === -1 ? null : options[valueIndex]}
          onChange={(_e, canton) => {
            if (onChange) onChange(canton?.code ?? null)
          }}
          options={options}
          renderOption={(optionProps, option) => (
            <SelectLocationOption
              {...optionProps}
              mode={mode}
              label={option.label}
              flagCode={option.code.toLowerCase()}
            />
          )}
          startDecorator={
            value ? <Flag mode={mode} code={value.toLowerCase()} /> : null
          }
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  )
}

export default SelectLocation

const getOptions = (mode: "canton" | "country"): LocationOption[] => {
  const cantons: LocationOption[] = [
    { code: "AG", label: "Aargau" },
    { code: "AI", label: "Appenzell Innerrhoden" },
    { code: "AR", label: "Appenzell Ausserrhoden" },
    { code: "BE", label: "Bern" },
    { code: "BL", label: "Basel-Landschaft" },
    { code: "BS", label: "Basel-Stadt" },
    { code: "FR", label: "Fribourg" },
    { code: "GE", label: "Geneva" },
    { code: "GL", label: "Glarus" },
    { code: "GR", label: "Graubünden" },
    { code: "JU", label: "Jura" },
    { code: "LU", label: "Lucerne" },
    { code: "NE", label: "Neuchâtel" },
    { code: "NW", label: "Nidwalden" },
    { code: "OW", label: "Obwalden" },
    { code: "SG", label: "St. Gallen" },
    { code: "SH", label: "Schaffhausen" },
    { code: "SO", label: "Solothurn" },
    { code: "SZ", label: "Schwyz" },
    { code: "TG", label: "Thurgau" },
    { code: "TI", label: "Ticino" },
    { code: "UR", label: "Uri" },
    { code: "VD", label: "Vaud" },
    { code: "VS", label: "Valais" },
    { code: "ZG", label: "Zug" },
    { code: "ZH", label: "Zurich" },
  ]
  if (mode === "canton") return cantons
  const countries: LocationOption[] = [
    { code: "AD", label: "Andorra" },
    {
      code: "AE",
      label: "United Arab Emirates",
    },
    { code: "AF", label: "Afghanistan" },
    {
      code: "AG",
      label: "Antigua and Barbuda",
    },
    { code: "AI", label: "Anguilla" },
    { code: "AL", label: "Albania" },
    { code: "AM", label: "Armenia" },
    { code: "AO", label: "Angola" },
    { code: "AQ", label: "Antarctica" },
    { code: "AR", label: "Argentina" },
    { code: "AS", label: "American Samoa" },
    { code: "AT", label: "Austria" },
    {
      code: "AU",
      label: "Australia",
    },
    { code: "AW", label: "Aruba" },
    { code: "AX", label: "Alland Islands" },
    { code: "AZ", label: "Azerbaijan" },
    {
      code: "BA",
      label: "Bosnia and Herzegovina",
    },
    { code: "BB", label: "Barbados" },
    { code: "BD", label: "Bangladesh" },
    { code: "BE", label: "Belgium" },
    { code: "BF", label: "Burkina Faso" },
    { code: "BG", label: "Bulgaria" },
    { code: "BH", label: "Bahrain" },
    { code: "BI", label: "Burundi" },
    { code: "BJ", label: "Benin" },
    { code: "BL", label: "Saint Barthelemy" },
    { code: "BM", label: "Bermuda" },
    { code: "BN", label: "Brunei Darussalam" },
    { code: "BO", label: "Bolivia" },
    { code: "BR", label: "Brazil" },
    { code: "BS", label: "Bahamas" },
    { code: "BT", label: "Bhutan" },
    { code: "BV", label: "Bouvet Island" },
    { code: "BW", label: "Botswana" },
    { code: "BY", label: "Belarus" },
    { code: "BZ", label: "Belize" },
    {
      code: "CA",
      label: "Canada",
    },
    {
      code: "CC",
      label: "Cocos (Keeling) Islands",
    },
    {
      code: "CD",
      label: "Congo, Democratic Republic of the",
    },
    {
      code: "CF",
      label: "Central African Republic",
    },
    {
      code: "CG",
      label: "Congo, Republic of the",
    },
    { code: "CH", label: "Switzerland" },
    { code: "CI", label: "Cote d'Ivoire" },
    { code: "CK", label: "Cook Islands" },
    { code: "CL", label: "Chile" },
    { code: "CM", label: "Cameroon" },
    { code: "CN", label: "China" },
    { code: "CO", label: "Colombia" },
    { code: "CR", label: "Costa Rica" },
    { code: "CU", label: "Cuba" },
    { code: "CV", label: "Cape Verde" },
    { code: "CW", label: "Curacao" },
    { code: "CX", label: "Christmas Island" },
    { code: "CY", label: "Cyprus" },
    { code: "CZ", label: "Czech Republic" },
    {
      code: "DE",
      label: "Germany",
    },
    { code: "DJ", label: "Djibouti" },
    { code: "DK", label: "Denmark" },
    { code: "DM", label: "Dominica" },
    {
      code: "DO",
      label: "Dominican Republic",
    },
    { code: "DZ", label: "Algeria" },
    { code: "EC", label: "Ecuador" },
    { code: "EE", label: "Estonia" },
    { code: "EG", label: "Egypt" },
    { code: "EH", label: "Western Sahara" },
    { code: "ER", label: "Eritrea" },
    { code: "ES", label: "Spain" },
    { code: "ET", label: "Ethiopia" },
    { code: "FI", label: "Finland" },
    { code: "FJ", label: "Fiji" },
    {
      code: "FK",
      label: "Falkland Islands (Malvinas)",
    },
    {
      code: "FM",
      label: "Micronesia, Federated States of",
    },
    { code: "FO", label: "Faroe Islands" },
    {
      code: "FR",
      label: "France",
    },
    { code: "GA", label: "Gabon" },
    { code: "GB", label: "United Kingdom" },
    { code: "GD", label: "Grenada" },
    { code: "GE", label: "Georgia" },
    { code: "GF", label: "French Guiana" },
    { code: "GG", label: "Guernsey" },
    { code: "GH", label: "Ghana" },
    { code: "GI", label: "Gibraltar" },
    { code: "GL", label: "Greenland" },
    { code: "GM", label: "Gambia" },
    { code: "GN", label: "Guinea" },
    { code: "GP", label: "Guadeloupe" },
    { code: "GQ", label: "Equatorial Guinea" },
    { code: "GR", label: "Greece" },
    {
      code: "GS",
      label: "South Georgia and the South Sandwich Islands",
    },
    { code: "GT", label: "Guatemala" },
    { code: "GU", label: "Guam" },
    { code: "GW", label: "Guinea-Bissau" },
    { code: "GY", label: "Guyana" },
    { code: "HK", label: "Hong Kong" },
    {
      code: "HM",
      label: "Heard Island and McDonald Islands",
    },
    { code: "HN", label: "Honduras" },
    { code: "HR", label: "Croatia" },
    { code: "HT", label: "Haiti" },
    { code: "HU", label: "Hungary" },
    { code: "ID", label: "Indonesia" },
    { code: "IE", label: "Ireland" },
    { code: "IL", label: "Israel" },
    { code: "IM", label: "Isle of Man" },
    { code: "IN", label: "India" },
    {
      code: "IO",
      label: "British Indian Ocean Territory",
    },
    { code: "IQ", label: "Iraq" },
    {
      code: "IR",
      label: "Iran, Islamic Republic of",
    },
    { code: "IS", label: "Iceland" },
    { code: "IT", label: "Italy" },
    { code: "JE", label: "Jersey" },
    { code: "JM", label: "Jamaica" },
    { code: "JO", label: "Jordan" },
    {
      code: "JP",
      label: "Japan",
    },
    { code: "KE", label: "Kenya" },
    { code: "KG", label: "Kyrgyzstan" },
    { code: "KH", label: "Cambodia" },
    { code: "KI", label: "Kiribati" },
    { code: "KM", label: "Comoros" },
    {
      code: "KN",
      label: "Saint Kitts and Nevis",
    },
    {
      code: "KP",
      label: "Korea, Democratic People's Republic of",
    },
    { code: "KR", label: "Korea, Republic of" },
    { code: "KW", label: "Kuwait" },
    { code: "KY", label: "Cayman Islands" },
    { code: "KZ", label: "Kazakhstan" },
    {
      code: "LA",
      label: "Lao People's Democratic Republic",
    },
    { code: "LB", label: "Lebanon" },
    { code: "LC", label: "Saint Lucia" },
    { code: "LI", label: "Liechtenstein" },
    { code: "LK", label: "Sri Lanka" },
    { code: "LR", label: "Liberia" },
    { code: "LS", label: "Lesotho" },
    { code: "LT", label: "Lithuania" },
    { code: "LU", label: "Luxembourg" },
    { code: "LV", label: "Latvia" },
    { code: "LY", label: "Libya" },
    { code: "MA", label: "Morocco" },
    { code: "MC", label: "Monaco" },
    {
      code: "MD",
      label: "Moldova, Republic of",
    },
    { code: "ME", label: "Montenegro" },
    {
      code: "MF",
      label: "Saint Martin (French part)",
    },
    { code: "MG", label: "Madagascar" },
    { code: "MH", label: "Marshall Islands" },
    {
      code: "MK",
      label: "Macedonia, the Former Yugoslav Republic of",
    },
    { code: "ML", label: "Mali" },
    { code: "MM", label: "Myanmar" },
    { code: "MN", label: "Mongolia" },
    { code: "MO", label: "Macao" },
    {
      code: "MP",
      label: "Northern Mariana Islands",
    },
    { code: "MQ", label: "Martinique" },
    { code: "MR", label: "Mauritania" },
    { code: "MS", label: "Montserrat" },
    { code: "MT", label: "Malta" },
    { code: "MU", label: "Mauritius" },
    { code: "MV", label: "Maldives" },
    { code: "MW", label: "Malawi" },
    { code: "MX", label: "Mexico" },
    { code: "MY", label: "Malaysia" },
    { code: "MZ", label: "Mozambique" },
    { code: "NA", label: "Namibia" },
    { code: "NC", label: "New Caledonia" },
    { code: "NE", label: "Niger" },
    { code: "NF", label: "Norfolk Island" },
    { code: "NG", label: "Nigeria" },
    { code: "NI", label: "Nicaragua" },
    { code: "NL", label: "Netherlands" },
    { code: "NO", label: "Norway" },
    { code: "NP", label: "Nepal" },
    { code: "NR", label: "Nauru" },
    { code: "NU", label: "Niue" },
    { code: "NZ", label: "New Zealand" },
    { code: "OM", label: "Oman" },
    { code: "PA", label: "Panama" },
    { code: "PE", label: "Peru" },
    { code: "PF", label: "French Polynesia" },
    { code: "PG", label: "Papua New Guinea" },
    { code: "PH", label: "Philippines" },
    { code: "PK", label: "Pakistan" },
    { code: "PL", label: "Poland" },
    {
      code: "PM",
      label: "Saint Pierre and Miquelon",
    },
    { code: "PN", label: "Pitcairn" },
    { code: "PR", label: "Puerto Rico" },
    {
      code: "PS",
      label: "Palestine, State of",
    },
    { code: "PT", label: "Portugal" },
    { code: "PW", label: "Palau" },
    { code: "PY", label: "Paraguay" },
    { code: "QA", label: "Qatar" },
    { code: "RE", label: "Reunion" },
    { code: "RO", label: "Romania" },
    { code: "RS", label: "Serbia" },
    { code: "RU", label: "Russian Federation" },
    { code: "RW", label: "Rwanda" },
    { code: "SA", label: "Saudi Arabia" },
    { code: "SB", label: "Solomon Islands" },
    { code: "SC", label: "Seychelles" },
    { code: "SD", label: "Sudan" },
    { code: "SE", label: "Sweden" },
    { code: "SG", label: "Singapore" },
    { code: "SH", label: "Saint Helena" },
    { code: "SI", label: "Slovenia" },
    {
      code: "SJ",
      label: "Svalbard and Jan Mayen",
    },
    { code: "SK", label: "Slovakia" },
    { code: "SL", label: "Sierra Leone" },
    { code: "SM", label: "San Marino" },
    { code: "SN", label: "Senegal" },
    { code: "SO", label: "Somalia" },
    { code: "SR", label: "Suriname" },
    { code: "SS", label: "South Sudan" },
    {
      code: "ST",
      label: "Sao Tome and Principe",
    },
    { code: "SV", label: "El Salvador" },
    {
      code: "SX",
      label: "Sint Maarten (Dutch part)",
    },
    {
      code: "SY",
      label: "Syrian Arab Republic",
    },
    { code: "SZ", label: "Swaziland" },
    {
      code: "TC",
      label: "Turks and Caicos Islands",
    },
    { code: "TD", label: "Chad" },
    {
      code: "TF",
      label: "French Southern Territories",
    },
    { code: "TG", label: "Togo" },
    { code: "TH", label: "Thailand" },
    { code: "TJ", label: "Tajikistan" },
    { code: "TK", label: "Tokelau" },
    { code: "TL", label: "Timor-Leste" },
    { code: "TM", label: "Turkmenistan" },
    { code: "TN", label: "Tunisia" },
    { code: "TO", label: "Tonga" },
    { code: "TR", label: "Turkey" },
    {
      code: "TT",
      label: "Trinidad and Tobago",
    },
    { code: "TV", label: "Tuvalu" },
    {
      code: "TW",
      label: "Taiwan",
    },
    {
      code: "TZ",
      label: "United Republic of Tanzania",
    },
    { code: "UA", label: "Ukraine" },
    { code: "UG", label: "Uganda" },
    {
      code: "US",
      label: "United States",
    },
    { code: "UY", label: "Uruguay" },
    { code: "UZ", label: "Uzbekistan" },
    {
      code: "VA",
      label: "Holy See (Vatican City State)",
    },
    {
      code: "VC",
      label: "Saint Vincent and the Grenadines",
    },
    { code: "VE", label: "Venezuela" },
    {
      code: "VG",
      label: "British Virgin Islands",
    },
    {
      code: "VI",
      label: "US Virgin Islands",
    },
    { code: "VN", label: "Vietnam" },
    { code: "VU", label: "Vanuatu" },
    { code: "WF", label: "Wallis and Futuna" },
    { code: "WS", label: "Samoa" },
    { code: "XK", label: "Kosovo" },
    { code: "YE", label: "Yemen" },
    { code: "YT", label: "Mayotte" },
    { code: "ZA", label: "South Africa" },
    { code: "ZM", label: "Zambia" },
    { code: "ZW", label: "Zimbabwe" },
  ]
  return countries
}
