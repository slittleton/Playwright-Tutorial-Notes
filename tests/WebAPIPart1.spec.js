const { APIUtils } = require('./utils/APIUtils');
const { test, expect, request } = require('@playwright/test');
// The "request" library part of playwright is used for API testing

let apiContext;
let apiUtils;
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "IamKing@000" };
const orderPayload = { "orders": [{ "country": "India", "productOrderedId": "62023a7616fcf72fe9dfc619" }] };
let token;
let orderId;
let response;

// Happens once time before all tests in file
test.beforeAll(async () => {

  apiContext = await request.newContext();
  apiUtils = new APIUtils(apiContext, loginPayLoad);


  response = await apiUtils.createOrder(orderPayload);
  orderId = response.orderId
  token = response.token

});

// Happens before each test in file
test.beforeEach(async () => {

});

test('API Test - get and use login token or cookie', async ({ page }) => {




  // put token in session storage
  // use addInitScript to run a normal JS function in a test
  // Login
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);



  // // Locators
  // const cardTitles = page.locator(".card-body a");
  // const cartLink = page.locator("[routerlink*='cart']");
  // const products = page.locator(".card-body");
  // const productName = 'zara coat 3';

  // await page.goto("https://rahulshettyacademy.com/client/");
  // await page.waitForLoadState('networkidle');
  // //Open orders list page
  // await page.locator("button[routerlink*='myorders']").click();






});