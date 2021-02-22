import { CustomError } from "./custom_error";

export class NotFoundError extends CustomError {
  status_code = 404;

  constructor() {
    super("Route not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize_errors() {
    return [
      {
        message: "Not Found",
      },
    ];
  }
}
