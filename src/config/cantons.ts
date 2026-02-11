/**
 * Swiss Canton Constants
 *
 * Defines all 26 Swiss cantons with their abbreviations, names in multiple languages,
 * and metadata for use in map visualizations.
 *
 * Inspired by: Kleiner Sprachatlas der deutschen Schweiz (https://www.kleinersprachatlas.ch/)
 * Geographic visualization approach informed by their excellent interactive dialect maps.
 */

export interface Canton {
  id: string // Two-letter abbreviation (e.g., "ZH")
  name: string // Default name
  nameDE: string // German name
  nameFR: string // French name
  nameIT: string // Italian name
  nameEN: string // English name
  capital: string // Capital city
  region: SwissRegion // Geographic region
  population?: number // Optional: population count
  area?: number // Optional: area in km²
  color: string // Canton display color (hex)
}

export type SwissRegion =
  | "northwestern" // Basel, Aargau, Solothurn
  | "zurich" // Zürich
  | "eastern" // St. Gallen, Appenzell, Thurgau, Glarus, Schaffhausen
  | "central" // Lucerne, Zug, Schwyz, Uri, Nidwalden, Obwalden
  | "bernese" // Bern
  | "western" // Geneva, Vaud, Neuchâtel, Jura, Fribourg
  | "ticino" // Ticino
  | "alpine" // Grisons, Valais

export const CANTON_COLORS: Record<string, string> = {
  AG: "#FF8C42",
  AI: "#8B4513",
  AR: "#DEB887",
  BE: "#DC143C",
  BL: "#4169E1",
  BS: "#191970",
  FR: "#2F4F4F",
  GE: "#FFD700",
  GL: "#B8860B",
  GR: "#4682B4",
  JU: "#8B0000",
  LU: "#4169E1",
  NE: "#228B22",
  NW: "#FF6347",
  OW: "#CD5C5C",
  SG: "#32CD32",
  SH: "#FFB300",
  SO: "#C41E3A",
  SZ: "#B22222",
  TG: "#7CFC00",
  TI: "#DC143C",
  UR: "#FFD700",
  VD: "#2E8B57",
  VS: "#8B0000",
  ZG: "#1E90FF",
  ZH: "#0066CC",
}

export const SWISS_CANTONS: Canton[] = [
  // Northwestern Switzerland
  {
    id: "AG",
    name: "Aargau",
    nameDE: "Aargau",
    nameFR: "Argovie",
    nameIT: "Argovia",
    nameEN: "Aargau",
    capital: "Aarau",
    region: "northwestern",
    population: 698518,
    area: 1403.73,
    color: CANTON_COLORS.AG,
  },
  {
    id: "BS",
    name: "Basel-Stadt",
    nameDE: "Basel-Stadt",
    nameFR: "Bâle-Ville",
    nameIT: "Basilea Città",
    nameEN: "Basel-City",
    capital: "Basel",
    region: "northwestern",
    population: 196735,
    area: 37.0,
    color: CANTON_COLORS.BS,
  },
  {
    id: "BL",
    name: "Basel-Landschaft",
    nameDE: "Basel-Landschaft",
    nameFR: "Bâle-Campagne",
    nameIT: "Basilea Campagna",
    nameEN: "Basel-Country",
    capital: "Liestal",
    region: "northwestern",
    population: 293436,
    area: 517.71,
    color: CANTON_COLORS.BL,
  },
  {
    id: "SO",
    name: "Solothurn",
    nameDE: "Solothurn",
    nameFR: "Soleure",
    nameIT: "Soletta",
    nameEN: "Solothurn",
    capital: "Solothurn",
    region: "northwestern",
    population: 280810,
    area: 790.46,
    color: CANTON_COLORS.SO,
  },

  // Zürich
  {
    id: "ZH",
    name: "Zürich",
    nameDE: "Zürich",
    nameFR: "Zurich",
    nameIT: "Zurigo",
    nameEN: "Zurich",
    capital: "Zürich",
    region: "zurich",
    population: 1553423,
    area: 1728.86,
    color: CANTON_COLORS.ZH,
  },

  // Eastern Switzerland
  {
    id: "AI",
    name: "Appenzell Innerrhoden",
    nameDE: "Appenzell Innerrhoden",
    nameFR: "Appenzell Rhodes-Intérieures",
    nameIT: "Appenzello Interno",
    nameEN: "Appenzell Inner Rhodes",
    capital: "Appenzell",
    region: "eastern",
    population: 16293,
    area: 172.47,
    color: CANTON_COLORS.AI,
  },
  {
    id: "AR",
    name: "Appenzell Ausserrhoden",
    nameDE: "Appenzell Ausserrhoden",
    nameFR: "Appenzell Rhodes-Extérieures",
    nameIT: "Appenzello Esterno",
    nameEN: "Appenzell Outer Rhodes",
    capital: "Herisau",
    region: "eastern",
    population: 55309,
    area: 242.98,
    color: CANTON_COLORS.AR,
  },
  {
    id: "GL",
    name: "Glarus",
    nameDE: "Glarus",
    nameFR: "Glaris",
    nameIT: "Glarona",
    nameEN: "Glarus",
    capital: "Glarus",
    region: "eastern",
    population: 40851,
    area: 685.34,
    color: CANTON_COLORS.GL,
  },
  {
    id: "SG",
    name: "St. Gallen",
    nameDE: "St. Gallen",
    nameFR: "Saint-Gall",
    nameIT: "San Gallo",
    nameEN: "St. Gallen",
    capital: "St. Gallen",
    region: "eastern",
    population: 520187,
    area: 2026.32,
    color: CANTON_COLORS.SG,
  },
  {
    id: "SH",
    name: "Schaffhausen",
    nameDE: "Schaffhausen",
    nameFR: "Schaffhouse",
    nameIT: "Sciaffusa",
    nameEN: "Schaffhausen",
    capital: "Schaffhausen",
    region: "eastern",
    population: 83531,
    area: 298.46,
    color: CANTON_COLORS.SH,
  },
  {
    id: "TG",
    name: "Thurgau",
    nameDE: "Thurgau",
    nameFR: "Thurgovie",
    nameIT: "Turgovia",
    nameEN: "Thurgau",
    capital: "Frauenfeld",
    region: "eastern",
    population: 282909,
    area: 991.04,
    color: CANTON_COLORS.TG,
  },

  // Central Switzerland
  {
    id: "LU",
    name: "Luzern",
    nameDE: "Luzern",
    nameFR: "Lucerne",
    nameIT: "Lucerna",
    nameEN: "Lucerne",
    capital: "Luzern",
    region: "central",
    population: 419352,
    area: 1493.46,
    color: CANTON_COLORS.LU,
  },
  {
    id: "NW",
    name: "Nidwalden",
    nameDE: "Nidwalden",
    nameFR: "Nidwald",
    nameIT: "Nidvaldo",
    nameEN: "Nidwalden",
    capital: "Stans",
    region: "central",
    population: 43820,
    area: 275.86,
    color: CANTON_COLORS.NW,
  },
  {
    id: "OW",
    name: "Obwalden",
    nameDE: "Obwalden",
    nameFR: "Obwald",
    nameIT: "Obvaldo",
    nameEN: "Obwalden",
    capital: "Sarnen",
    region: "central",
    population: 38108,
    area: 490.55,
    color: CANTON_COLORS.OW,
  },
  {
    id: "SZ",
    name: "Schwyz",
    nameDE: "Schwyz",
    nameFR: "Schwytz",
    nameIT: "Svitto",
    nameEN: "Schwyz",
    capital: "Schwyz",
    region: "central",
    population: 162157,
    area: 908.2,
    color: CANTON_COLORS.SZ,
  },
  {
    id: "UR",
    name: "Uri",
    nameDE: "Uri",
    nameFR: "Uri",
    nameIT: "Uri",
    nameEN: "Uri",
    capital: "Altdorf",
    region: "central",
    population: 36819,
    area: 1076.57,
    color: CANTON_COLORS.UR,
  },
  {
    id: "ZG",
    name: "Zug",
    nameDE: "Zug",
    nameFR: "Zoug",
    nameIT: "Zugo",
    nameEN: "Zug",
    capital: "Zug",
    region: "central",
    population: 130183,
    area: 238.73,
    color: CANTON_COLORS.ZG,
  },

  // Bern
  {
    id: "BE",
    name: "Bern",
    nameDE: "Bern",
    nameFR: "Berne",
    nameIT: "Berna",
    nameEN: "Bern",
    capital: "Bern",
    region: "bernese",
    population: 1043132,
    area: 5959.44,
    color: CANTON_COLORS.BE,
  },

  // Western Switzerland (Romandy)
  {
    id: "FR",
    name: "Fribourg",
    nameDE: "Freiburg",
    nameFR: "Fribourg",
    nameIT: "Friburgo",
    nameEN: "Fribourg",
    capital: "Fribourg",
    region: "western",
    population: 327782,
    area: 1670.7,
    color: CANTON_COLORS.FR,
  },
  {
    id: "GE",
    name: "Genève",
    nameDE: "Genf",
    nameFR: "Genève",
    nameIT: "Ginevra",
    nameEN: "Geneva",
    capital: "Genève",
    region: "western",
    population: 508368,
    area: 282.48,
    color: CANTON_COLORS.GE,
  },
  {
    id: "JU",
    name: "Jura",
    nameDE: "Jura",
    nameFR: "Jura",
    nameIT: "Giura",
    nameEN: "Jura",
    capital: "Delémont",
    region: "western",
    population: 73709,
    area: 838.69,
    color: CANTON_COLORS.JU,
  },
  {
    id: "NE",
    name: "Neuchâtel",
    nameDE: "Neuenburg",
    nameFR: "Neuchâtel",
    nameIT: "Neuchâtel",
    nameEN: "Neuchâtel",
    capital: "Neuchâtel",
    region: "western",
    population: 176301,
    area: 803.13,
    color: CANTON_COLORS.NE,
  },
  {
    id: "VD",
    name: "Vaud",
    nameDE: "Waadt",
    nameFR: "Vaud",
    nameIT: "Vaud",
    nameEN: "Vaud",
    capital: "Lausanne",
    region: "western",
    population: 818776,
    area: 3212.08,
    color: CANTON_COLORS.VD,
  },

  // Ticino
  {
    id: "TI",
    name: "Ticino",
    nameDE: "Tessin",
    nameFR: "Tessin",
    nameIT: "Ticino",
    nameEN: "Ticino",
    capital: "Bellinzona",
    region: "ticino",
    population: 350986,
    area: 2812.21,
    color: CANTON_COLORS.TI,
  },

  // Alpine regions
  {
    id: "GR",
    name: "Graubünden",
    nameDE: "Graubünden",
    nameFR: "Grisons",
    nameIT: "Grigioni",
    nameEN: "Grisons",
    capital: "Chur",
    region: "alpine",
    population: 199021,
    area: 7105.44,
    color: CANTON_COLORS.GR,
  },
  {
    id: "VS",
    name: "Valais",
    nameDE: "Wallis",
    nameFR: "Valais",
    nameIT: "Vallese",
    nameEN: "Valais",
    capital: "Sion",
    region: "alpine",
    population: 348503,
    area: 5224.47,
    color: CANTON_COLORS.VS,
  },
]

/**
 * Get canton by ID (case-insensitive)
 */
export function getCantonById(id: string): Canton | undefined {
  return SWISS_CANTONS.find(
    (canton) => canton.id.toLowerCase() === id.toLowerCase(),
  )
}

/**
 * Get canton name in specified language
 */
export function getCantonName(
  cantonId: string,
  locale: "de" | "fr" | "it" | "en" = "de",
): string {
  const canton = getCantonById(cantonId)
  if (!canton) return cantonId

  switch (locale) {
    case "de":
      return canton.nameDE
    case "fr":
      return canton.nameFR
    case "it":
      return canton.nameIT
    case "en":
      return canton.nameEN
    default:
      return canton.name
  }
}

/**
 * Get all cantons in a specific region
 */
export function getCantonsByRegion(region: SwissRegion): Canton[] {
  return SWISS_CANTONS.filter((canton) => canton.region === region)
}

/**
 * Check if canton ID is valid
 */
export function isValidCantonId(id: string): boolean {
  return SWISS_CANTONS.some(
    (canton) => canton.id.toLowerCase() === id.toLowerCase(),
  )
}

/**
 * Map of canton IDs to their names (for backward compatibility)
 */
export const CANTON_NAMES: Record<string, string> = Object.fromEntries(
  SWISS_CANTONS.map((canton) => [canton.id, canton.name]),
)

/**
 * Array of all canton IDs
 */
export const CANTON_IDS = SWISS_CANTONS.map((canton) => canton.id)

/**
 * Map full canton names (from GeoJSON) to canton IDs
 * Used to match GeoJSON feature properties.NAME to our canton abbreviations
 */
export const GEOJSON_NAME_TO_ID: Record<string, string> = {
  Zürich: "ZH",
  Bern: "BE",
  Luzern: "LU",
  Uri: "UR",
  Schwyz: "SZ",
  Obwalden: "OW",
  Nidwalden: "NW",
  Glarus: "GL",
  Zug: "ZG",
  Fribourg: "FR",
  Solothurn: "SO",
  "Basel-Stadt": "BS",
  "Basel-Landschaft": "BL",
  Schaffhausen: "SH",
  "Appenzell Ausserrhoden": "AR",
  "Appenzell Innerrhoden": "AI",
  "St. Gallen": "SG",
  Graubünden: "GR",
  Aargau: "AG",
  Thurgau: "TG",
  Ticino: "TI",
  Vaud: "VD",
  Valais: "VS",
  Neuchâtel: "NE",
  Genève: "GE",
  Jura: "JU",
}

/**
 * Get canton ID from GeoJSON feature name
 */
export function getCantonIdFromGeoJSONName(name: string): string | undefined {
  return GEOJSON_NAME_TO_ID[name]
}
