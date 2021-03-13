module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    'padded-blocks': [ 'error', 'always' ],
    'indent': [ 'error', 'tab', { SwitchCase: 1 } ],
    'no-tabs': [ 'error', { allowIndentationTabs: true } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'never' ],
    'react/jsx-indent': [ 'error', 'tab' ],
    'react/require-default-props': 'off',
    'react/jsx-indent-props': [ 'error', 'tab' ],
    'jsx-a11y/label-has-associated-control': 'off',
    'arrow-parens': [ 'error', 'as-needed' ],
    'object-curly-newline': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/alt-text': 'off',
    'import/no-unresolved': [ 2, { ignore: [ '\.jpg$' ] } ],
    'jsx-a11y/no-static-element-interactions': 'off'
  },
};
