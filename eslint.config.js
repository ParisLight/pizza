// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    "eslint.options": {
      "overrideConfig": {
        "env": {
          "browser": true,
            "es6": true
        },
        "parserOptions": {
          "ecmaVersion": 2019,
            "sourceType": "module",
            "ecmaFeatures": {
            "jsx": true
          }
        },
        "rules": {
          "no-debugger": "off"
        }
      }
    },
    rules: {
      semi: "error",
      "prefer-const": "error",
      reportUnusedDisableDirectives: false,
    },
  },
]);
