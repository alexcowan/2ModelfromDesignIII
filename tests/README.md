# Playwright System Tests

This directory contains system tests for the HVAC Parts Catalog application using Playwright.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run specific test file
```bash
npx playwright test tests/catalog.spec.js
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Structure

- **`catalog.spec.js`**: Tests for the main catalog page (parts display, filtering, navigation)
- **`auth.spec.js`**: Tests for authentication functionality (login, registration, password recovery)
- **`detail.spec.js`**: Tests for the part detail page (part information, reviews)

## Configuration

The Playwright configuration is in `playwright.config.js`. It:
- Automatically starts a local web server on port 8000
- Runs tests in parallel
- Generates HTML reports
- Takes screenshots on failure
- Captures traces for failed tests

## Notes

- Tests require a local web server. The config uses Python's HTTP server by default.
- Some tests depend on Firebase data. For full test coverage, you may want to:
  - Use Firebase emulators for testing
  - Mock Firebase responses
  - Use test data in Firestore
- Tests that require authentication will need valid Firebase credentials or mocked auth state.

## Viewing Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

