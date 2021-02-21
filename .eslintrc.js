module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
    // "react/react-in-jsx-scope": "off",
    quotes: ["error", "double"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-use-before-define": ["error", "nofunc"],
    "jsx-a11y/anchor-is-valid": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    // the following is handled better by TypeScript
    "no-unused-vars": ["off"],
    // Rules below are disabled to avoid clashes with Prettier
    "no-confusing-arrow": ["off"],
    "implicit-arrow-linebreak": ["off"],
    "comma-dangle": ["off"],
    "react/jsx-one-expression-per-line": ["off"],
    "operator-linebreak": ["off"],
    indent: ["off"],
    "nonblock-statement-body-position": "off",
    curly: "off",
    "object-curly-newline": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  globals: { React: "readonly" },
};
