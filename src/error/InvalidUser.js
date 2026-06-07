class InvalidUser extends Error {
  constructor(message) {
    super(message);
    this.name = "Invalid User";
    this.statusCode = 404;
  }
}
export default InvalidUser;
