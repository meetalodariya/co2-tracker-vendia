class HttpError extends Error {
  statusCode: number;

  constructor(msg: string, statusCode: number = 500) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export default HttpError;
