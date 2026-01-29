# Swift Translator Test Automation
## IT23210288 - ITPM Assignment 1

### Project Overview
This project contains automated test cases for the Swift Translator (Singlish to Sinhala) application using Playwright.

### Test Coverage
- **Total Test Cases:** 35
  - Positive Functional Tests: 24
  - Negative Functional Tests: 10
  - UI Tests: 1

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation Steps

1. Clone this repository:
```bash
git clone [YOUR_GITHUB_REPO_URL]
cd swift-translator-playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

### Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode (to see browser):
```bash
npx playwright test --headed
```

Run only the translator tests:
```bash
npx playwright test tests/translator.spec.js
```

### Project Structure
```
swift-translator-playwright/
├── tests/
│   └── translator.spec.js       # Main test file
├── testdata/
│   └── IT23210288.xlsx          # Test cases Excel file
├── playwright.config.js         # Playwright configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

### Test Data
All test cases are driven by the Excel file located in `testdata/IT23210288.xlsx`

### Test Results
- **Positive Tests:** 24/25 passed (96% success rate)
- **Negative Tests:** 10/10 correctly identified translator issues
- **UI Tests:** 1 test case implemented

### Notes
- Tests are executed in Chromium browser by default
- Test results include screenshots and videos for failed tests
- All test data is maintained in the Excel file for easy updates