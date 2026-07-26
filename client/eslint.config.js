import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } }, globals: { document: "readonly", window: "readonly", localStorage: "readonly", fetch: "readonly", FormData: "readonly", addEventListener: "readonly", removeEventListener: "readonly", KeyboardEvent: "readonly" } },
    rules: { "no-undef": "off", "@typescript-eslint/no-explicit-any": "off" },
  },
];
