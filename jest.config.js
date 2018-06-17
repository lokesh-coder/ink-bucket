module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupTestFrameworkScriptFile: './src/setup-jest.ts',
  globals: {
    'ts-jest': {
      tsConfigFile: 'src/tsconfig.spec.json'
    },
    __TRANSFORM_HTML__: true
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.(ts|js|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js'
  },
  testMatch: ['**/__tests__/**/*.+(ts|js)?(x)', '**/+(*.)+(spec|test).+(ts|js)?(x)'],
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  moduleNameMapper: {
    '@services/(.*)': '<rootDir>/src/app/library/services/$1',
    '@elements/(.*)': '<rootDir>/src/app/library/elements/$1',
    '@components/(.*)': '<rootDir>/src/app/library/components/$1',
    '@store/(.*)': '<rootDir>/src/app/library/store/$1',
    '@lib/(.*)': '<rootDir>/src/app/library/$1',
    '@root/(.*)': '<rootDir>/src/app/$1'
  },
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-preset-angular/AngularSnapshotSerializer.js',
    '<rootDir>/node_modules/jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
