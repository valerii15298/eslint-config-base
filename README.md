# eslint-config

This is opinionated strictest ESLint configuration for TypeScript projects I was able to came up with.

Example using eslint flat config `eslint.config.js`:

```js
import tsEslint from "typescript-eslint";
import baseConfig from "@vpetryniak/eslint-config-base";

export default tsEslint.config(...baseConfig, {
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```
