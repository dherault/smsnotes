export default class ApigError {
  
  constructor(statusCode, message) {
    this.statusCode = statusCode || 500;
    this.message = message || 'Internal server error.';
  }
  
  toString() {
    return JSON.stringify({ 
      statusCode: this.statusCode,
      message: this.message,
    });
  }
}
