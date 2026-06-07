class Unauthorized extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 401;

    this.name = "Unathorized";
  }
}
export default Unauthorized;
