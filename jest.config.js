/* eslint no-undef: "error" */
/* eslint-env node */
module.exports = {
<<<<<<< HEAD
=======
    /* eslint no-undef: "error" */
>>>>>>> f9bbe7e (test(UI): ADDON-58762 Jest setup)
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
