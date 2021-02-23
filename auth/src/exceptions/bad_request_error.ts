import { CustomError } from "./custom_error";

export class BadRequestError extends CustomError {
  status_code = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize_errors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
