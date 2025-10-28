// @ts-check

import js from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import tsEslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import pluginImportX from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintReact from "@eslint-react/eslint-plugin";

/** @type {import("eslint/config").Config} */
const config = {
  plugins: {
    "simple-import-sort": simpleImportSort,
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
    "sort-keys": "off",
    "no-await-in-loop": "off",
    "capitalized-comments": "off",
    camelcase: "off",
    "max-lines": "off",
    "no-underscore-dangle": "off",
    "no-unused-expressions": "off", // covered by https://typescript-eslint.io/rules/no-unused-expressions/
    "no-implicit-coercion": ["error", { allow: ["!!", "+"] }],
    "func-style": "off",
    "no-param-reassign": "off",
    "no-sequences": "off",
    "max-classes-per-file": "off",

    // https://github.com/lydell/eslint-plugin-simple-import-sort#usage
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
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/parameter-properties": "off",
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      { allowShortCircuit: true },
    ],
  },
};

const importX = [
  pluginImportX.flatConfigs.errors,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs["stage-0"],
  pluginImportX.flatConfigs.typescript,
  pluginImportX.flatConfigs.warnings,
];

/**
 *
 * @param {string} webGlob
 */
function reactEslintConfig(webGlob) {
  return defineConfig(
    {
      ...reactHooks.configs.flat["recommended"],
      files: [webGlob],
    },
    { ...reactRefresh.configs.vite, files: [webGlob] },
    // @ts-expect-error
    { ...pluginImportX.flatConfigs.react, files: [webGlob] },
    { ...eslintReact.configs.all, files: [webGlob] },
    {
        rules: {
          "@eslint-react/naming-convention/filename": "off",
          "@eslint-react/avoid-shorthand-boolean": "off",
          "@eslint-react/avoid-shorthand-fragment": "off",
          "@eslint-react/no-complex-conditional-rendering": "off",
          "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
          "@eslint-react/web-api/no-leaked-timeout": "off",
          "@eslint-react/naming-convention/use-state": "off",
          "@eslint-react/no-children-prop": "off",
          "@eslint-react/no-array-index-key": "off",
          "@eslint-react/prefer-destructuring-assignment": "off",
          "@eslint-react/no-unnecessary-use-memo": "off",
          "@eslint-react/hooks-extra/no-unnecessary-use-memo": "off", // TODO recheck this
    
          "react-hooks/set-state-in-effect": "off",
          "react-hooks/use-memo": "off",
          "react-hooks/static-components": "off",
          "react-hooks/refs": "off",
          "react-hooks/incompatible-library": "off",
        },
        files: [webGlob],
      },
  );
}

/**
 *
 * @param {{gitignorePath: string; projects?: string[]; webGlob?: string}} params
 */
export function eslintConfig(params) {
  return defineConfig(
    js.configs.all,
    tsEslint.configs.all,
    config,
    configPrettier,
    {
      languageOptions: { parserOptions: { projectService: true } },
    },
    // @ts-expect-error
    importX,
    {
      settings: {
        "import-x/resolver-next": params.projects?.map((project) =>
          createTypeScriptImportResolver({
            alwaysTryTypes: true,
            project,
          })
        ),
      },
    },
    includeIgnoreFile(params.gitignorePath),
    params.webGlob ? reactEslintConfig(params.webGlob) : {}
  );
}
