import { NextFunction, Request, Response } from "express";

import { CustomError } from "../exceptions/custom_error";

export const error_handler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res
      .status(error.status_code)
      .send({ errors: error.serialize_errors() });
  }

  res.status(400).json({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });
};
