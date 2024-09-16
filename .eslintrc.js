module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  parser: "flow",  // moved to the top level
  rules: {
    "prettier/prettier": ["error", { singleQuote: false }],
  },
};
