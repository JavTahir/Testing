# Running End-to-End Tests

## Prerequisites

The project uses Playwright for end-to-end testing.

## Running Tests

1. Install dependencies:
```bash
npm install
```

2. Run the tests:
```bash
npm run test:e2e
```

## Test Structure

The tests are located in `tests/auth.spec.ts` and cover:
- Homepage loading
- Navigation
- Form validation
- Authentication flows
- Error handling

Each test case is documented with a clear description of what it's testing.

## Test Report

After running the tests, you can view the HTML report by opening the generated report in the `playwright-report` directory.