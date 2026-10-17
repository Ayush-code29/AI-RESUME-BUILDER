require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const notFound = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.disable("x-powered-by");

// ======================================================
// CORS CONFIGURATION
// ======================================================

const allowedOrigins = (
  process.env.CLIENT_URL ||
  "https://ai-resume-builder-delta.vercel.app,http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

console.log("Allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests that don't have an Origin header
      // (for example, direct browser/API requests)
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.error("CORS blocked origin:", origin);

      return callback(
        new Error(`Origin ${origin} is not allowed by CORS`)
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    optionsSuccessStatus: 204,
  })
);

// ======================================================
// SECURITY
// ======================================================

app.use(helmet());

// ======================================================
// BODY PARSERS
// ======================================================

app.use(
  express.json({
    limit: "1mb",
    strict: true,
  })
);

app.use(
  express.urlencoded({
    extended: false,
    limit: "1mb",
  })
);

// ======================================================
// RATE LIMITING
// ======================================================

const windowMs =
  Number.parseInt(
    process.env.API_RATE_LIMIT_WINDOW_MS,
    10
  ) || 15 * 60 * 1000;

const apiLimiter = rateLimit({
  windowMs,

  limit:
    Number.parseInt(
      process.env.API_RATE_LIMIT_MAX,
      10
    ) || 200,

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
    message:
      "Too many authentication attempts. Try again later.",
  },
});

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume Builder API is running.",
    environment:
      process.env.NODE_ENV || "development",
  });
});

// ======================================================
// ROOT ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Resume Builder API is running 🚀",
  });
});

// ======================================================
// API ROUTES
// ======================================================

app.use(
  "/api/auth",
  authLimiter,
  authRoutes
);

app.use(
  "/api",
  apiLimiter
);

app.use(
  "/api/resumes",
  resumeRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

// ======================================================
// 404 HANDLER
// MUST BE AFTER ALL ROUTES
// ======================================================

app.use(notFound);

// ======================================================
// ERROR HANDLER
// MUST BE LAST
// ======================================================

app.use(errorMiddleware);

module.exports = app;