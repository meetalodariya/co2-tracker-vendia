module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
  moduleDirectories: ['node_modules'],
  roots: ['./src'],
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['./src/actions/**'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
};
