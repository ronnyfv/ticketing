import { ValidationError } from "express-validator";

import { CustomError } from "./custom_error";

export class RequestValidationError extends CustomError {
  status_code = 400;

  constructor(private errors: ValidationError[]) {
    super("Error connecting to database");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialize_errors() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}
