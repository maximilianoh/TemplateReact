module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ["airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  plugins: ["react"],
  rules: {},
  settings: {
    "import/resolver": {
      alias: {
        map: [["cJsx", "./src/"]],
        extensions: [".js", ".jsx"]
      }
    }
  },
  overrides: [
    {
      files: ["node_modules/**.js"],
      rules: {
        "require-jsdoc": "off"
      }
    }
  ]
};
