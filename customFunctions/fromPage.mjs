

export async function fromPage(page) {

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const txt = await page.locator('label[for="password"]').textContent();
  
  console.log(txt)
}