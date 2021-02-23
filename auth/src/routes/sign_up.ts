import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { BadRequestError } from "../exceptions/bad_request_error";
import { RequestValidationError } from "../exceptions/request_validation_error";
import { User } from "./../models/user";

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

    const existing_user = await User.findOne({ email });

    if (existing_user) {
      throw new BadRequestError("Email already in use");
    }

    const user = User.build({
      email,
      password,
    });

    await user.save();

    return res.status(201).send(user);
  }
);

export { router as sign_up_router };
