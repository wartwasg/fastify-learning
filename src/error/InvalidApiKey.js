class InvalidApiKey extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidApiKey";
    this.statusCode = 401;
  }
}

export default InvalidApiKey;
