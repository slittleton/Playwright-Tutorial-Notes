const { test, expect } = require('@playwright/test');
import { randomPhonenumber } from '../../CustomFunctions/randomPhoneNumber.mjs';
import { logArg } from '../../CustomFunctions/logArg.mjs';
import { fromPage } from '../../CustomFunctions/fromPage.mjs';


test('Import custom function', async ({ page }) => {
  console.log("TEST Starts")


  // const rand = randomPhonenumber();
  // console.log('Phone Num: ' + rand)


  // await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  // const txt = await page.locator('label[for="password"]').textContent()

  //  logArg("The value is: ", txt, page)

  await fromPage(page)

})

