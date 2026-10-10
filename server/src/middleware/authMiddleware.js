
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is missing.",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be configured correctly.");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, secret, {
      issuer: "ai-resume-builder",
      audience: "ai-resume-builder-client",
      algorithms: ["HS256"],
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Your session has expired. Please log in again."
          : "Invalid authentication token.",
    });
  }

  if (!decoded.sub || !mongoose.isValidObjectId(decoded.sub)) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token.",
    });
  }

  const user = await User.findById(decoded.sub)
    .select("_id name email createdAt")
    .lean();

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Account no longer exists. Please log in again.",
    });
  }

  req.user = user;
  next();
});

module.exports = { protect };