const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({ browser }) => {

  // chrome - plugins - cookies, proxy, etc
  // cookies can be injected as parameters into newContext()

  const context = await browser.newContext();
  const page = await context.newPage();


  // Locators
  const userName = page.locator('#username');
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log('PRINTING THE PAGE TITLE: ' + await page.title());

  await userName.type("rahulshetty");
  await page.locator("[type='password']").type("learning");
  await signIn.click();
  // here we expect an a message to show up saying "error incorrect password"
  // playwright has an autowait feature that will wait for the change to occur
  // so here it waits for [style*='block'] to show up before continuing to the next steps
  let errMsg = await page.locator("[style*='block']").textContent();
  console.log(errMsg); // Incorrect username/password.

  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

  // await userName.fill(""); // clear or enters text
  // await userName.fill("rahulshettyacademy");
  // await signIn.click();

  // console.log(await cardTitles.nth(1).textContent());

  // // Get text from all elements with this selector - into an array
  // // allTextContents() does not have autowait so you shoudl use a textContent() first 
  // // because textContent() does have autowait
  // const allTitles = await cardTitles.allTextContents();
  // console.log(allTitles);



  //Sometimes you will need a different way to wait for content such as a page to navigate

  await userName.fill(""); // clear or enters text
  await userName.fill("rahulshettyacademy");

  
  await Promise.all(
    [
      // the nav action happens after you click()
      // here we are letting Playwright know that a navigation step is comming
      // if we don't do this then the click() will occur and Playwright will 
      // move onto the next step before it should - such as if the next page has not loaded
      // avoids race conditions by using Promise.all to resolve all the promises before proceeding further
      page.waitForNavigation(),
      await signIn.click()
    ]
  );


  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);






  await page.pause();
});

// CHOICE SELECT AND BOOLEANS ===================================================================
test('Select and UI Controls', async ({ page }) => {
  const userName = page.locator('#username');
  const signIn = page.locator("#signInBtn");
  const dropDown = page.locator("select.form-control");
  const documentLink = page.locator('[href*="documents.request"]');

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await dropDown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  // assertion
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  // if you want to simply print to output use:
  console.log(await page.locator(".radiotextsty").last().isChecked());

  await page.locator("#terms").click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator("#terms").uncheck();
  //If you need to use a boolean in your assertion
  // Also notice the await is inside the expect here 
  // this is because you only use await on the action that is being performed
  // works the same way when you console.log such as console.log(await thing.isChecked())
  expect(await page.locator("#terms").last().isChecked().toBeFalsy());


  // check if element has class name
  await expect(documentLink.toHaveAttribute("class", "blinkingText"));
});


// Child Windows and Tabs =============================================================================

test('Child Windows and Tabs', async ({ browser }) => {


  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator('#username');
  const documentLink = page.locator('.blinkingText');

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


  // await page.pause()
  // opening in seperate tab
  // Wait for event of New Page to open
  // surround in [] in case multiple new pages are opened
  // PROMISE.ALL TO WAIT FOR MULTIPLE STEPS TO FINISH ==============================================
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click()
  ]);
  // Use newPage context to automate on the newly opened page
  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  console.log(text);
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);

  // after aquiring domain from child window - fill domaiin on parent window
  await userName.type(domain);

  const capturedUserName = await userName.textContent()
  console.log("Username:" + capturedUserName)

  
});