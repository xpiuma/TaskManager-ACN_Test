/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '^react$': require.resolve('react'),
    '^react-dom$': require.resolve('react-dom'),
  },
  globals: {},
  reporters: [
    'default',
    [ 'jest-junit', { outputDirectory: './reports/junit', outputName: 'junit.xml' } ],
    [ 'jest-html-reporter', {
        pageTitle: 'Frontend Test Report',
        outputPath: './reports/test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true
      }
    ]
  ],
};