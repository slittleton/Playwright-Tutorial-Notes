const { APIUtils } = require('./utils/APIUtils');
const { test, expect, request } = require('@playwright/test');
// The "request" library part of playwright is used for API testing



/**
 * 
 * INTERCEPT NETWORK REQUEST 
 * -and provide your own data to the front end
 * 
 * also
 * PRINT NETWORK CALLS 
 */



let apiContext;
let apiUtils;
const loginPayLoad = { userEmail: "rahulshett@gmail.com", userPassword: "IamKing@000" };
const orderPayload = { "orders": [{ "country": "India", "productOrderedId": "62023a7616fcf72fe9dfc619" }] };
let token;
let orderId;
let response;
const fakePayloadOrders = { data: [], message: "No Orders" };


// Happens once time before all tests in file
test.beforeAll(async () => {

  apiContext = await request.newContext();
  apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayload);
  orderId = response.orderId;
  token = response.token;

});

// Happens before each test in file
test.beforeEach(async () => {

});

test('Network Test - intercept network request and supply font end with our own data', async ({ page }) => {


  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  //PRINT NETWORK CALLS to the console so you can see if one has failed
  page.on('request', request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status()));


  // Locators
  const cardTitles = page.locator(".card-body a");
  const cartLink = page.locator("[routerlink*='cart']");
  const products = page.locator(".card-body");
  const productName = 'zara coat 3';

  await page.goto("https://rahulshettyacademy.com/client/");

  //Mock orders call
  await page.waitForLoadState('networkidle');

  const url = 'https://rahulshettyacademy.com/api/ecomorder/get-orders-for-customer/62026f4edfa52b09e0a20b18';

  //Open orders list page
  await page.locator("button[routerlink*='myorders']").click();

  await page.route(url, async route => {
    // before making request to url
    // continue with different url (such as to a different user account)
    // you are overriding the url that it would normally use for the request
    route.continue({ url: "https://rahulshettyacademy.com/api/ecomorder/get-orders-for-customer/1234567878142341" });
  });




  await page.locator("text=View").first().click();





});