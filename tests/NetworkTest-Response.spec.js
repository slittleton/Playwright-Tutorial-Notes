const { APIUtils } = require('./utils/APIUtils');
const { test, expect, request } = require('@playwright/test');
// The "request" library part of playwright is used for API testing



/**
 * 
 * INTERCEPT NETWORK RESPONSE 
 * -and provide your own data to the front end
 * 
 */



let apiContext;
let apiUtils;
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "IamKing@000" };
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



  // Locators
  const cardTitles = page.locator(".card-body a");
  const cartLink = page.locator("[routerlink*='cart']");
  const products = page.locator(".card-body");
  const productName = 'zara coat 3';

  await page.goto("https://rahulshettyacademy.com/client/");

  //Mock orders call
  await page.waitForLoadState('networkidle');

  const url = 'https://rahulshettyacademy.com/api/ecomorder/get-orders-for-customer/62026f4edfa52b09e0a20b18';


  // Must do before the actual request is sent so Playwright knows what you are attempting to do
  // re-route page in the way we want it to be
  // route() takes url and callback as params
  // normal lifecycle ---     API response -> browser -> render data on front end
  // playwright lifecycle --- API response -> {Fake Response} -> browser -> render data on front end
  await page.route(url, async route => {
    // intercepting response
    const response = await page.request.fetch(route.request);
    // fake response
    let body = fakePayloadOrders;
    // fulfill will automatically use the request's info unless you specify different info
    // so here we will allow it to use the headers and response type it already has and just
    // pass it the body as the only difference so we are sending the response to the front end
    // but we are overriding the body
    route.fulfill({
      response, body
    });

    // intercepting response


  });




  //Open orders list page
  await page.locator("button[routerlink*='myorders']").click();






});