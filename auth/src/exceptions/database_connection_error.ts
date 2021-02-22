import { CustomError } from "./custom_error";

export class DatabaseConnectionError extends CustomError {
  status_code = 500;
  reason = "Error connecting to database";

  constructor() {
    super("Invalid body parameters");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serialize_errors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
