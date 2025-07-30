import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Update this based on your actual project structure
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  // coverageReporters: ['text', 'lcov'],
  // Add more setup options before each test is run
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)