module.exports = {
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transformIgnorePatterns: [
      '/node_modules/(?!axios)',
    ],
  };
  