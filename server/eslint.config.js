import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: { parserOptions: { ecmaVersion: "latest", sourceType: "module" }, globals: { console: "readonly", process: "readonly" } },
    rules: { "no-undef": "off", "@typescript-eslint/no-explicit-any": "off" },
  },
];
