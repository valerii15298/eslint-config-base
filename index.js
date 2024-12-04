// @ts-check

import js from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import tsEslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tsEslint.config(
  js.configs.all,
  ...tsEslint.configs.all,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "@typescript-eslint": tsEslint.plugin,
    },
    rules: {
      "max-lines-per-function": "off",
      "new-cap": "off",
      "max-statements": "off",
      "no-useless-assignment": "off",
      "id-length": "off",
      "no-undefined": "off",
      "no-void": "off",
      "no-warning-comments": "off",
      "no-duplicate-imports": "off",
      "one-var": "off",
      "no-inline-comments": "off",
      "no-ternary": "off",
      "sort-imports": "off",
      "func-style": ["error", "declaration"],
      "sort-keys": "off",
      "no-await-in-loop": "off",
      camelcase: ["error", { properties: "never" }],
      "capitalized-comments": "off",

      // Sort imports https://github.com/lydell/eslint-plugin-simple-import-sort#usage
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      
      // https://typescript-eslint.io/
      "@typescript-eslint/no-unsafe-type-assertion": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/class-methods-use-this": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/consistent-return": "off",
    },
  },
  configPrettier
);
