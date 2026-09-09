const path = require('path');

const config = require('@folio/jest-config-stripes');

const esModules = [
  '@folio',
  'ky',
  'uuid',
].join('|');

module.exports = {
  ...config,
  collectCoverageFrom: [
    ...config.collectCoverageFrom,
    // declaration files contain no executable code; they would only add empty rows
    '!**/*.d.ts',
  ],
  setupFiles: [
    ...config.setupFiles,
    path.join(__dirname, './test/jest/setupFiles.js'),
  ],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
