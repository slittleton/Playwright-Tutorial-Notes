

class LoginPage {

  constructor(page) {
    this.page = page;
    this.userEmail = this.page.locator('#userEmail');
    this.loginBtn = this.page.locator("[value='Login']");
    this.passwordIn = this.page.locator("#userPassword");

  }


  async validLogin(username, password) {
    await this.userEmail.fill(username);
    await this.passwordIn.type(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

}

module.exports = { LoginPage };