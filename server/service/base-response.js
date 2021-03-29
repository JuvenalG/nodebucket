/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Date: 28 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: Object that holds a simple server response that our particular API can use gracefully respond with
 */

class BaseResponse
{
    constructor(httpCode, message, data)
    {  //standard response format for API calls
      this.httpCode = httpCode;
      this.message = message;
      this.data = data;
      this.timestamp = new Date().toLocaleDateString("en-US");
    }

    toObject()
    {
      return{
        "httpCode" : this.httpCode,
        "message" : this.message,
        "data" :  this.data,
        "timestamp" : this.timestamp
      }
    }
}

module.exports = BaseResponse;
