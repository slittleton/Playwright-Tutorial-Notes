
class DashboardPage{

  constructor(page){
    this.page = page
    this.cardTitles = this.page.locator(".card-body a");
    this.cartLink = this.page.locator("[routerlink*='cart']");
    this.products = this.page.locator(".card-body");
  }
}