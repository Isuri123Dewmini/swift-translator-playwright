const { test, expect } = require('@playwright/test');
const XLSX = require('xlsx');
const path = require('path');

// Load Excel file
const excelPath = path.join(__dirname, '../testdata/IT23210288.xlsx');
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert Excel sheet to JSON
const testCases = XLSX.utils.sheet_to_json(sheet);

test.describe('Swift Translator – Excel Based Automation', () => {

  for (const tc of testCases) {

    test(`${tc['TC ID']} - ${tc['Test case name']}`, async ({ page }) => {

      // Step 1: Open Swift Translator website
      await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });

      // Step 2: Wait for page to be fully loaded
      await page.waitForLoadState('domcontentloaded');

      // Step 3: Locate Singlish input textarea
      const singlishInput = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
      
      // Step 4: Wait for input to be visible and fill it
      await singlishInput.waitFor({ state: 'visible', timeout: 5000 });
      await singlishInput.fill(tc['Input']);

      // Step 5: Click the Translate button (if it exists)
      try {
        const translateButton = page.locator('button:has-text("Translate")');
        await translateButton.click({ timeout: 2000 });
      } catch (e) {
        // If no translate button, just wait
        await page.waitForTimeout(3000);
      }

      // Step 6: Locate the Sinhala output DIV (NOT textarea!)
      const sinhalaOutput = page.locator('div.bg-slate-50');

      // Step 7: Wait until translation appears
      await expect(sinhalaOutput).toBeVisible({ timeout: 5000 });
      
      // Wait for the output to have content
      await page.waitForTimeout(2000);

      // Step 8: Read actual output from the div
      const actualOutput = (await sinhalaOutput.textContent()).trim();
      const expectedOutput = tc['Expected output'].trim();

      // Step 9: Log for debugging
      console.log(`Test: ${tc['TC ID']}`);
      console.log(`Input: ${tc['Input']}`);
      console.log(`Expected: ${expectedOutput}`);
      console.log(`Actual: ${actualOutput}`);

      // Step 10: Compare actual vs expected
      expect(actualOutput).toContain(expectedOutput);

    });

  }

});