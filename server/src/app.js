
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const notFound = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.disable("x-powered-by");

const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS."));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());

app.use(express.json({ limit: "1mb", strict: true }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

const windowMs =
  Number.parseInt(process.env.API_RATE_LIMIT_WINDOW_MS, 10) ||
  15 * 60 * 1000;

const apiLimiter = rateLimit({
  windowMs,
  limit: Number.parseInt(process.env.API_RATE_LIMIT_MAX, 10) || 200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Try again later.",
  },
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume Builder API is running.",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api", apiLimiter);
app.use("/api/resumes", resumeRoutes);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;