import { test, expect } from '@playwright/test';

test('Search for Software Testing and verify results', async ({ page }) => {
    // Step 1: Define the search term as a variable
    const searchTerm = 'Software Testing';

    // Step 2: Navigate to the main page
    await page.goto('https://onlinelibrary.wiley.com/');

    // Step 3: Enter the search term in the search bar
    await page.fill('input#searchField1', searchTerm);

    // Step 4: Click the 'Search' button
    await page.click('button[title="Search"]');

    // Step 5: Wait for results to load and verify the URL
    await expect(page).toHaveURL(new RegExp(`action/doSearch\\?AllField=${encodeURIComponent(searchTerm)}`));

    // Step 6: Verify that relevant results are displayed
    const results = await page.locator('#search-result');
    await expect(results).toBeVisible();

    // Check that at least one result contains the search term
    const firstResult = await results.locator('li.search__item');
    await expect(firstResult).toContainText(searchTerm);
});
