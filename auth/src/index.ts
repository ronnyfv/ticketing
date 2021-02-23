import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import { current_user_router } from "./routes/current_user";
import { sign_in_router } from "./routes/sign_in";
import { sign_out_router } from "./routes/sign_out";
import { sign_up_router } from "./routes/sign_up";
import { error_handler } from "./middlewares/error_handler";
import { NotFoundError } from "./exceptions/not_found_error";

const app = express();

app.use(json());

app.use(current_user_router);
app.use(sign_in_router);
app.use(sign_out_router);
app.use(sign_up_router);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(error_handler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Connected to mongo!");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
