
const express = require("express");
const { body } = require("express-validator");

const { register, login } = require("../controllers/authController");

const router = express.Router();

const emailValidation = body("email")
  .isString()
  .withMessage("Email is required.")
  .bail()
  .trim()
  .isEmail()
  .withMessage("Enter a valid email address.")
  .bail()
  .isLength({ max: 254 })
  .withMessage("Email is too long.")
  .normalizeEmail();

const passwordValidation = body("password")
  .isString()
  .withMessage("Password is required.")
  .bail()
  .isLength({ min: 8, max: 72 })
  .withMessage("Password must be 8–72 characters long.");

router.post(
  "/register",
  body("name")
    .isString()
    .withMessage("Name is required.")
    .bail()
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must be 2–80 characters long."),
  emailValidation,
  passwordValidation,
  register
);

router.post(
  "/login",
  emailValidation,
  body("password")
    .isString()
    .withMessage("Password is required.")
    .bail()
    .notEmpty()
    .withMessage("Password is required.")
    .bail()
    .isLength({ max: 72 })
    .withMessage("Password is too long."),
  login
);

module.exports = router;