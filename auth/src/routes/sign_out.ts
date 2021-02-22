import express from "express";

const router = express.Router();

router.post("/api/users/sign_out", (req, res) => {
  res.send("Hello current user!");
});

export { router as sign_out_router };
