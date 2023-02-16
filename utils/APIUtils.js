



 class APIUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
    this.token = ''

  }

  async getToken() {

    /// make api post request. param 1 = url, param 2 = options such as headers and/or request payload
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {data: this.loginPayLoad}
    );

    const loginResponseJson = await loginResponse.json();
    console.log(loginResponse)
    
    token = loginResponseJson.token;
    console.log(token);

    return token;
  }

  async createOrder(orderPayload) {
    //create order
    const response = {}
    response.token = await this.getToken()
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          'Authorization': response.token,
          'Content-Type': 'application/json'
        }
      }
    );

    const orderResponseJson = await orderResponse.json();

    orderId = orderResponseJson.orders[0];
    response.orderId = orderId;

    return response

  }






}

module.exports = {APIUtils}