# Swift Translator Test Automation
## IT23210288 - ITPM Assignment 1

### Project Overview
This project contains automated test cases for the Swift Translator (Singlish to Sinhala) application using Playwright. The test suite validates translation accuracy, handles edge cases, and verifies UI functionality with robust retry mechanisms for reliable test execution.

### Test Coverage
- **Total Test Cases:** 35
  - **Positive Functional Tests:** 24 (Pos_Fun_0001 to Pos_Fun_0024)
  - **Negative Functional Tests:** 10 (Neg_Fun_0001 to Neg_Fun_0010)
  - **UI Tests:** 1 (Pos_UI_0001)

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git (for version control)

### Installation Steps

1. **Clone this repository:**
```bash
git clone https://github.com/Isuri123Dewmini/swift-translator-playwright

cd swift-translator-playwright
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install Playwright browsers:**
```bash
npx playwright install
```

### Running Tests

**Run all tests:**
```bash
npx playwright test
```

**Run tests in headed mode (to see browser):**
```bash
npx playwright test --headed
```

**Run specific test file:**
```bash
npx playwright test tests/translator.spec.js
```

**Run with test report:**
```bash
npx playwright test
npx playwright show-report
```

**Run in debug mode:**
```bash
npx playwright test --debug
```

### Project Structure
```
swift-translator-playwright/
├── tests/
│   └── translator.spec.js       # Main test automation script
├── testdata/
│   └── IT23210288.xlsx          # Excel-based test cases
├── test-results/                # Test execution results (auto-generated)
├── playwright-report/           # HTML test reports (auto-generated)
├── playwright.config.js         # Playwright configuration
├── package.json                 # Project dependencies
├── package-lock.json            # Dependency lock file
└── README.md                    # Project documentation
```

### Test Data
All test cases are data-driven from the Excel file: `testdata/IT23210288.xlsx`

**Excel Structure:**
- **TC ID:** Test case identifier
- **Test case name:** Descriptive test name
- **Input length type:** S (Short) or M (Medium)
- **Input:** Singlish text to translate
- **Expected output:** Expected Sinhala translation
- **Actual output:** Populated during test execution
- **Status:** Pass/Fail status
- **Accuracy justification:** Notes on test results
- **What is covered by the test:** Test coverage details

### Test Results

**Latest Test Execution:**
- ✅ **Positive Functional Tests:** 24/24 passed (100% success rate)
- ✅ **Negative Functional Tests:** 10/10 correctly identified translator issues (expected failures)
- ✅ **UI Tests:** 1/1 passed (100% success rate)
- 🎯 **Overall Success:** 35/35 tests executed successfully

**Key Test Scenarios Covered:**
1. Simple daily statements and present actions
2. Compound sentences with negation and sequential actions
3. Complex conditional and causal sentences
4. Interrogative and imperative forms
5. Emotional expressions and greetings
6. Multi-word collocations and temporal markers
7. Real-time UI translation updates
8. Error handling (spacing, spelling, capitalization issues)

### Features

**Robust Test Implementation:**
- ✅ **Excel-Driven Testing:** All test data maintained in Excel for easy updates
- ✅ **Retry Mechanism:** Automatic retry with page reload for intermittent failures
- ✅ **Smart Waiting:** Intelligent polling (up to 15 seconds) for translation output
- ✅ **Error Recovery:** Handles slow translations and network delays
- ✅ **Detailed Logging:** Console output shows input, expected, actual, and attempt count
- ✅ **Visual Evidence:** Screenshots and videos captured for failed tests
- ✅ **Negative Testing:** Expected failures marked with `test.fail()` for proper reporting

**Test Execution Highlights:**
- Maximum wait time: 15 seconds per attempt
- Retry attempts: Up to 3 full page reloads if needed
- Polling interval: 500ms between output checks
- Browser: Chromium (default)

### Test Execution Flow

1. **Load Test Data:** Reads test cases from Excel file
2. **Navigate:** Opens Swift Translator website
3. **Input:** Enters Singlish text in input field
4. **Translate:** Triggers translation (auto or button click)
5. **Wait & Verify:** Polls for output with retry mechanism
6. **Compare:** Validates actual vs expected Sinhala output
7. **Report:** Logs results and captures evidence for failures

### Troubleshooting

**Issue: Tests fail with timeout**
```bash
# Increase timeout in playwright.config.js
timeout: 60000  # 60 seconds
```

**Issue: No output received**
- The retry mechanism handles this automatically (up to 3 attempts)
- Check internet connection
- Verify Swift Translator website is accessible

**Issue: npm install fails**
```bash
# Clear npm cache and retry
npm cache clean --force
npm install
```

**Issue: Playwright browsers not installed**
```bash
npx playwright install --with-deps
```

### Maintenance

**Updating Test Cases:**
1. Open `testdata/IT23210288.xlsx`
2. Add/modify test cases in the spreadsheet
3. Save the file
4. Run tests - changes are automatically picked up

**Updating Dependencies:**
```bash
npm update
npx playwright install
```

### Notes
- Tests run in Chromium browser by default (configurable in `playwright.config.js`)
- Test results include screenshots and videos for failed tests in `test-results/` folder
- Negative tests are expected to fail and are marked accordingly
- All test data is maintained in Excel for easy updates without code changes
- The test suite includes intelligent retry logic to handle translator delays

### CI/CD Integration (Optional)

**GitHub Actions Example:**
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Contact & Support
- **Student ID:** IT23210288
- **Course:** ITPM Assignment 1
- **Framework:** Playwright
- **Language:** JavaScript/Node.js

### License
This project is created for educational purposes as part of ITPM coursework.

---

**Last Updated:** January 2026  
**Test Suite Version:** 2.0  
**Status:** All Tests Passing ✅