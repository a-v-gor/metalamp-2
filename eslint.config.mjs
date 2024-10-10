import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {ignores: ["**/*.config.mjs", "./node_modules"]},
  {env: {
    "es6": true,
    "browser": true,
    "node": true
  }},
];