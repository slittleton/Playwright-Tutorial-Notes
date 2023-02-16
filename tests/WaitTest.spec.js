const { test, expect, request } = require('@playwright/test');
import {wait} from '../CustomFunctions/wait.mjs'

// function wait(seconds) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log("waited " + seconds + " seconds");
//       resolve('resolved');

//     }, seconds * 1000);
//   });
// }

test('API Test - get and use login token or cookie', async ({ page }) => {


  await page.goto('https://www.amazon.com/');

  await wait(10);

  await page.goto('https://www.google.com/');

});