import nextConfig from "eslint-config-next"

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...nextConfig,
  {
    rules: {
      "no-console": "warn",
      "prefer-template": "warn",
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "react/display-name": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "react/no-children-prop": "off",
      "no-restricted-imports": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    ignores: ["generated/**", "node_modules/**", "_old_backup/**"],
  },
]

export default config
