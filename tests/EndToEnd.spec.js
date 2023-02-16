const { test, expect } = require('@playwright/test');

test('End To End', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  // Locators
  const userEmail = page.locator('#userEmail');
  const loginBtn = page.locator("[value='Login']");
  const passwordIn = page.locator("#userPassword");
  const cardTitles = page.locator(".card-body a");
  const cartLink = page.locator("[routerlink*='cart']");

  const products = page.locator(".card-body");
  const productName = 'zara coat 3';

  await page.goto("https://rahulshettyacademy.com/client/");
  await userEmail.fill("anshika@gmail.com");
  await passwordIn.type("Iamking@000");
  await loginBtn.click();
  await page.waitForLoadState('networkidle');

  const titles = await cardTitles.allTextContents();

  // Look through 'cards' (shopping items on page) find a specific one and add to cart ---------------------------

  // get number of matching elements
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    let product = await products.nth(i);
    let currentProductName = await product.locator("b").textContent();

    if (productName == currentProductName) {
      // Add product to cart
      console.log(await product.textContent());
      await product.locator("text= Add To Cart").click();
      break;
    }
  }
  // Navigate to Cart
  await cartLink.click();
  // Wait for page to load - use method that has build in autowait 
  // to ensure page is loaded before proceeding
  page.locator("div li").first().waitFor();

  const bool = await page.locator(`h3:has-text(${productName})`).isVisible(); // note: isVisible() does not have autowait
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  // Delay each character that is typed by 100 ms when filling in form
  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; i++) {
    const text = dropdown.locator("button").nth(i).textContent();

    if (text === " India") {
      dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator(".user__name [type='text']")).toHaveText(email);
  await page.locator(".action_submit").click();

  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent;

  console.log(orderID);

  await page.locator("button[routerlink*='myorders']").click();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderID = await rows.nth(i).locator("th").textContent();
    if (orderID.includes(rowOrderID)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();

  expect(orderID.includes(orderIdDetails)).toBeTruthy();
  

  







  await page.pause();
});