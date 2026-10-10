
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const getValidationErrors = (req) => {
  const result = validationResult(req);

  if (result.isEmpty()) return null;

  const error = new Error(
    result.array().map((item) => item.msg).join(" ")
  );

  error.statusCode = 400;
  return error;
};

const createToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be configured with a strong secret.");
  }

  return jwt.sign({}, secret, {
    subject: userId.toString(),
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    issuer: "ai-resume-builder",
    audience: "ai-resume-builder-client",
  });
};

const safeUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

const register = asyncHandler(async (req, res) => {
  const validationError = getValidationErrors(req);
  if (validationError) throw validationError;

  const name = req.body.name.trim();
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists.",
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  let user;

  try {
    user = await User.create({
      name,
      email,
      passwordHash,
    });
  } catch (error) {
    // Handles simultaneous registrations for the same unique email.
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    throw error;
  }

  const token = createToken(user._id);

  res.status(201).json({
    success: true,
    message: "Registration successful.",
    data: {
      user: safeUser(user),
      token,
      tokenType: "Bearer",
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const validationError = getValidationErrors(req);
  if (validationError) throw validationError;

  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  const user = await User.findOne({ email }).select("+passwordHash");

  // Keep the error generic to avoid revealing which emails are registered.
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  const token = createToken(user._id);

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: {
      user: safeUser(user),
      token,
      tokenType: "Bearer",
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  });
});

module.exports = {
  register,
  login,
};