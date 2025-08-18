const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMyProfile,
} = require("../controllers/auth.controller.js");
const { protect } = require("../middleware/authMiddleware.js");
const {
    registerValidator,
    loginValidator,
} = require("../validators/auth.validator.js");
const { validationResult } = require("express-validator");

const validate = (validators) => [
    ...validators,
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }
        next();
    },
];

router.post("/register", validate(registerValidator), register);
router.post("/login", validate(loginValidator), login);
router.get("/me", protect, getMyProfile); // protected route

module.exports = router;
