const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react'
  ].map(require.resolve),
  parserOptions: {
    project
  },
  plugins: ['only-warn'],
  globals: {
    JSX: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
  rules: {
    'import/no-default-export': 'off'
  },
  overrides: [
    {
      files: ['test/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/no-array-index-key': 'off'
      }
    }
  ]
}
