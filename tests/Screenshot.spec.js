const { test, expect } = require('@playwright/test');
/**
 * SCREENSHOTS
 * 
 * await page.screenshot({path: 'screenshot.png})
 * 
 * await page.locator("[type='password']").type("learning").screenshot({path: 'screeshotOnElement.png'});
 * 
 * You can also have playwright compare the current screenshot to the previous screenshot
 * so if you run a test today and ran one yesterday playwright can compare the two
 * if the image is different than it was in the previous screenshot it can then fail the test
 * 
 * expect(await page.screenshot()).toMatchSnapshot('landing.png')
 * 
 * test will fail on first run because there is no prior screenshot
 * the next run will then compare the two to see if the images match
 * 
 */

test('Browser Context Playwright Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();


  // Locators
  const userName = page.locator('#username');
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log('PRINTING THE PAGE TITLE: ' + await page.title());


  // TAKE SCREENSHOT
  await page.screenshot({path: 'screenshot.png'})
  expect(await page.screenshot()).toMatchSnapshot('landing.png')


  await userName.type("rahulshetty");
  // SCREENSHOT on Locator
  await page.locator("[type='password']").type("learning").screenshot({path: 'screeshotOnElement.png'});
  await signIn.click();

  let errMsg = await page.locator("[style*='block']").textContent();
  console.log(errMsg); // Incorrect username/password.

  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

  await userName.fill(""); // clear or enters text
  await userName.fill("rahulshettyacademy");

  
  await Promise.all(
    [
      page.waitForNavigation(),
      await signIn.click()
    ]
  );


  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);

});
