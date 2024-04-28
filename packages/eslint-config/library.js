const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript'
  ].map(require.resolve),
  parserOptions: {
    project
  },
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  overrides: [
    {
      files: ['test/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
}
