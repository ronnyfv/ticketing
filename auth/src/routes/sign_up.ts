import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { DatabaseConnectionError } from "../exceptions/database_connection_error";
import { RequestValidationError } from "../exceptions/request_validation_error";

const router = express.Router();

router.post(
  "/api/users/sign_up",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    throw new DatabaseConnectionError();

    res.send(`sign_up! ${email} ${password}`);
  }
);

export { router as sign_up_router };
