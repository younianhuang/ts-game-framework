const path = require('path');

module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      'eslint-import-resolver-typescript': true,
    },
    typescript: {
      alwaysTryTypes: true,
    },
  },
  env: {
    commonjs: true,
    browser: true,
    es6: true,
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": ["error", {"printWidth": 120}],
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": 0,
    "no-console": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "quotes": "off",
    "class-methods-use-this": "off",
    "no-trailing-spaces": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "memberLike",
        "modifiers": ["private"],
        "format": ["strictCamelCase"],
        "leadingUnderscore": "require",
      },
      {
        "selector": "property",
        "format": ["strictCamelCase", "PascalCase"],
      },
      {
        "selector": "property",
        "modifiers": ["private"],
        "format": ["strictCamelCase", "PascalCase"],
        "leadingUnderscore": "require",
      },
      {
        "selector": "classMethod",
        "modifiers": ["public"],
        "format": ["camelCase"],
      },
      {
        "selector": "classMethod",
        "modifiers": ["protected"],
        "format": ["camelCase"],
        "leadingUnderscore": "require",
      },
      {
        "selector": "classMethod",
        "modifiers": ["private"],
        "format": ["camelCase"],
        "leadingUnderscore": "require",
      },
      {
        "selector": "classProperty",
        "modifiers": ["protected"],
        "format": ["camelCase"],
        "leadingUnderscore": "require",
      },
      {
        "selector": "classProperty",
        "modifiers": ["public"],
        "format": ["camelCase"],
      },
      {
        "selector": "classProperty",
        "modifiers": ["private"],
        "format": ["camelCase"],
        "leadingUnderscore": "require",
      },
      {
        "selector": "class",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^[A-Z]",
          "match": true
        }
      },
      {
        "selector": "typeMethod",
        "modifiers": ["public"],
        "format": ["camelCase","PascalCase"],
      },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      },
      {
        "selector": "variable",
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "should"],
      },
    ],
    "eqeqeq": "error",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["warn"],
    "@typescript-eslint/no-empty-interface": [
      "warn",
      {
        "allowSingleExtends": false
      }
    ],
  },
};
