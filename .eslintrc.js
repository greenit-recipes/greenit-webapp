//Todo : Setup a proper linting configuration
module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
  ],
  "rules": {
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-case-declarations": "off",
    "no-constant-condition": "off",
    "no-empty": "off",
    "no-extra-boolean-cast": "off"
  },
  "plugins": [
    "react-hooks"
  ],
};
