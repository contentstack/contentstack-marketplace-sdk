module.exports = {
  env: {
    browser: true,
    amd: true,
    mocha: true,
    node: true
  },
  extends: 'standard',
  // "globals": {
  //     "Atomics": "readonly",
  //     "SharedArrayBuffer": "readonly"
  // },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'standard',
    'promise'
  ],
  rules: {
  }
}
