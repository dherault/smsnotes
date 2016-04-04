export default class ApigError {
  
  constructor(statusCode, originalMessage) {
    this.statusCode = statusCode || 500;
    this.originalMessage = originalMessage || 'Internal server error.';
    
    this.message = JSON.stringify({
      statusCode: this.statusCode,
      message: this.originalMessage
    });
  }
  
  toString() {
    return this.message;
  }
}
