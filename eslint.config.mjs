import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["**/build/"],
    languageOptions: { 
      globals: globals.browser 
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "consistent-return": "warn",
      "eqeqeq": "warn",
      "no-console": "warn",
      "no-param-reassign": "warn",
      "prefer-const": "error",
      "no-else-return": "error",
      "no-implicit-coercion": "warn",
    }
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier
];