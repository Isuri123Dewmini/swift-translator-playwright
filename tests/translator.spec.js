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

      // Determine if this is a negative test case
      const isNegativeTest = tc['TC ID'].startsWith('Neg_');
      
      // Mark negative tests as expected to fail
      if (isNegativeTest) {
        test.fail();
      }

      // Function to perform translation attempt
      async function attemptTranslation(retryCount = 0) {
        // Step 1: Open Swift Translator website
        await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });

        // Step 2: Wait for page to be fully loaded
        await page.waitForLoadState('domcontentloaded');

        // Step 3: Locate Singlish input textarea
        const singlishInput = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
        
        // Step 4: Wait for input to be visible and fill it
        await singlishInput.waitFor({ state: 'visible', timeout: 5000 });
        
        // Clear any existing input first
        await singlishInput.clear();
        await page.waitForTimeout(500);
        
        // Fill the input
        await singlishInput.fill(tc['Input']);

        // Step 5: Click the Translate button (if it exists)
        try {
          const translateButton = page.locator('button:has-text("Translate")');
          await translateButton.click({ timeout: 2000 });
        } catch (e) {
          // If no translate button, just wait
          await page.waitForTimeout(3000);
        }

        // Return the sinhala output locator
        return page.locator('div.bg-slate-50');
      }

      // Step 6: Handle UI test cases differently
      if (tc['TC ID'] === 'Pos_UI_0002') {
        // For copy button test, we need different logic
        await attemptTranslation();
        
        const copyButton = page.locator('button:has-text("Copy")');
        await copyButton.waitFor({ state: 'visible', timeout: 5000 });
        
        // Click the copy button
        await copyButton.click();
        
        // Wait a moment for clipboard operation
        await page.waitForTimeout(1000);
        
        // Get clipboard content using CDP (Chrome DevTools Protocol)
        const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
        
        console.log(`Test: ${tc['TC ID']}`);
        console.log(`Input: ${tc['Input']}`);
        console.log(`Clipboard content: ${clipboardText}`);
        
        // Check if the Sinhala text is in clipboard
        expect(clipboardText).toContain('අපි පාසල් යනවා');
        
      } else if (tc['TC ID'] === 'Pos_UI_0001') {
        // For real-time update test
        const sinhalaOutput = await attemptTranslation();

        // Wait until translation appears
        await expect(sinhalaOutput).toBeVisible({ timeout: 5000 });
        
        // Wait for the output to have content
        await page.waitForTimeout(2000);

        // Read actual output from the div
        const actualOutput = (await sinhalaOutput.textContent()).trim();
        
        // Extract the actual Sinhala text from the expected output
        const expectedOutput = tc['Expected output'].trim();
        let sinhalaText = expectedOutput;
        
        // If the expected output contains descriptive text, extract just the Sinhala part
        if (expectedOutput.includes(':')) {
          sinhalaText = expectedOutput.split(':').pop().trim();
        }

        // Log for debugging
        console.log(`Test: ${tc['TC ID']}`);
        console.log(`Input: ${tc['Input']}`);
        console.log(`Expected (full): ${expectedOutput}`);
        console.log(`Expected (Sinhala only): ${sinhalaText}`);
        console.log(`Actual: ${actualOutput}`);

        // Compare actual vs expected (just the Sinhala text)
        expect(actualOutput).toBe(sinhalaText);
        
      } else {
        // Regular translation test cases with retry logic
        
        let actualOutput = '';
        let totalAttempts = 0;
        const maxRetries = 2; // Try the whole process up to 2 times
        
        for (let retry = 0; retry <= maxRetries; retry++) {
          // Attempt translation
          const sinhalaOutput = await attemptTranslation(retry);

          // Wait until translation appears
          await expect(sinhalaOutput).toBeVisible({ timeout: 5000 });
          
          // Wait for the output to have actual content (not empty)
          let attempts = 0;
          const maxAttempts = 30; // 30 attempts * 500ms = 15 seconds max wait per retry
          
          while (attempts < maxAttempts) {
            actualOutput = (await sinhalaOutput.textContent()).trim();
            
            // If we got content, break the loop
            if (actualOutput.length > 0) {
              totalAttempts = attempts + 1;
              break;
            }
            
            // Wait 500ms before trying again
            await page.waitForTimeout(500);
            attempts++;
          }
          
          // If we got output, break the retry loop
          if (actualOutput.length > 0) {
            if (retry > 0) {
              console.log(`Success on retry ${retry}`);
            }
            break;
          }
          
          // If this is not the last retry, log and continue
          if (retry < maxRetries) {
            console.log(`No output after ${attempts + 1} attempts. Retrying... (Attempt ${retry + 2}/${maxRetries + 1})`);
            totalAttempts = attempts + 1;
          } else {
            totalAttempts = attempts + 1;
          }
        }

        const expectedOutput = tc['Expected output'].trim();

        // Log for debugging
        console.log(`Test: ${tc['TC ID']}`);
        console.log(`Input: ${tc['Input']}`);
        console.log(`Expected: ${expectedOutput}`);
        console.log(`Actual: ${actualOutput}`);
        console.log(`Attempts: ${totalAttempts}`);

        // If actualOutput is still empty, the assertion will fail with a clear message
        if (actualOutput.length === 0) {
          console.error(`ERROR: No output received after ${maxRetries + 1} full retries`);
        }
        
        expect(actualOutput).toContain(expectedOutput);
      }

    });

  }

});
