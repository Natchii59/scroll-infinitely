/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  resetMocks: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom']
}

module.exports = config
