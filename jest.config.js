/* eslint no-undef: "error" */
/* eslint-env node */
module.exports = {
    /* eslint no-undef: "error" */
    // Mock
    clearMocks: true,

    // env settings
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    modulePathIgnorePatterns: ['<rootDir>/src/main/resources'],

    // Coverage
    collectCoverage: true,
    collectCoverageFrom: ['src/main/webapp/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
};
