import nextConfig from "eslint-config-next"

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...nextConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    ignores: [
      "generated/**",
      "*/generated/**",
      "node_modules/**",
      ".next/",
      ".yarn/",
      "_old_backup/**",
    ],
  },
]

export default config
