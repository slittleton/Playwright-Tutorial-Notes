const {test} = require('@playwright/test')
// here '@playwright/test' is being called base instead of test
// so that we can differentiate it (you can name it anything you want)

// extend test() by adding fixture to it


base.test.extend(
  {
    testDataForOrder: {
      username: "anshika@gmail.com",
      password: "IamKing@000",
      productName: "Zara Coat 4"
    }
  }
)