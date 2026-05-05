/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.test.tsx'
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/src/test/mocks/styleMock.ts',
    '\\.(png|jpe?g|gif|webp)$': '<rootDir>/src/test/mocks/fileMock.ts',
    '\\.svg\\?react$': '<rootDir>/src/test/mocks/svgReactMock.tsx',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.jest.json' }]
  }
};

export default config;
