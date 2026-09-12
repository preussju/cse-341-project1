import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
  rules: {
    "react/react-in-jsx-scope": "off"
  },
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node // Adds support for require, module, process, etc.
      }
    } 
  },
  {
    // Merges the recommended React linting paths into your global workspace
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect" // Clears the "React version not specified" warning
      }
    }
  }
]);
