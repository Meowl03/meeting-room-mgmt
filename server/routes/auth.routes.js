const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMyProfile,
} = require("../controllers/auth.controller.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMyProfile); // protected route

module.exports = router;
