const { test, expect } = require('@playwright/test');


test('Popup Validations', async ({ page }) => {


  // Locators
  const userEmail = page.locator('#userEmail');
  const loginBtn = page.locator("[value='Login']");
  const passwordIn = page.locator("#userPassword");
  const cardTitles = page.locator(".card-body a");
  const cartLink = page.locator("[routerlink*='cart']");

  const products = page.locator(".card-body");
  const productName = 'zara coat 3';

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // await page.goto("https://www.google.com/")
  // await page.goBack()
  // await page.goForward()

  await expect(page.locator("displayed-text")).toBeVisible();
  await page.locator("hide-textbox").click();
  await expect(page.locator("displayed-text")).toBeHidden();

  // Handle Popup Alert - page.on listens for events
  // put before the step that causes the alert
  page.on("dialog", dialog => dialog.accept);
  await page.locator("#confirmbtn").click();

  // Hover
  await page.locator("mousehover").hover();

  // Frames
  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href*='lifetime-access]:visible").click();
  const textCheck =  await framesPage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1])


});