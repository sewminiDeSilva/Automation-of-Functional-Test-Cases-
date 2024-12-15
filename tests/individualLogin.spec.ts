import { test, expect } from '@playwright/test';

test('User should be able to log in successfully', async ({ page }) => {
    // Step 1: Define credentials as variables
    const email = process.env.USER_EMAIL || 'cecim66615@eoilup.com'; // Use environment variable or fallback
    const password = process.env.USER_PASSWORD || '123qweA!'; // Use environment variable or fallback

    // Step 2: Navigate to the initial login/register page
    await page.goto('https://onlinelibrary.wiley.com/');

    // Step 3: Click on the "Login / Register" button
    await page.click('button#indivLogin');

    // Step 4: Click on the "Individual login" link
    await page.click('text=Individual login');

    // Step 5: Wait for the login page to load
   await expect(page).toHaveURL('https://wiley.scienceconnect.io/login', { timeout: 15000 });

    // Step 6: Wait for the email input field to appear and enter the email
    await page.fill('input#email-input', email);

    // Step 7: Click on the "Continue" button
    await page.click('button#sign-in-btn');

    // Step 8: Wait for the password input field to appear and enter the password
    await page.fill('input#pass-input', password);

    // Step 9: Click on the "Continue" button
    await page.click('button#password-sign-in-btn');

    // Step 10: Verify that the user is redirected to the homepage after login
    await expect(page).toHaveURL('https://wiley.scienceconnect.io/dashboard', { timeout: 15000 });

    // Step 11: Save the storage state for future authenticated sessions
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
