const { test, expect } = require('@playwright/test');


test('Browser Context Playwright Test', async ({ page }) => {

  const email = page.locator("#userEmail");
  const pass = page.locator("#userPassword");
  const loginBtn = page.locator("[value='Login']");


  await page.goto("https://rahulshettyacademy.com/client");
  await email.fill("anshika@gmail.com");
  await pass.type("Iamking@000");
  await loginBtn.click();

  // Implement wait mechanism before attempting allTextContents() because it doesn't have an autowait
  // wait until all netword requests have finished
  // useful for microservice based apps
  await page.waitForLoadState('networkidle');
  const titles = await page.locator(".card-body b").allTextContents();

});


