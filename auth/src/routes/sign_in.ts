import express from "express";

const router = express.Router();

router.post("/api/users/sign_in", (req, res) => {
  res.send("Hello current user!");
});

export { router as sign_in_router };
