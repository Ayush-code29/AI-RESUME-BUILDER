const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  enhanceSummary,
  enhanceSkills,
} = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Every AI call costs money, so only logged-in users may use it...
router.use(protect);

// ...and each user gets a limited number of requests per hour.
router.use(
  rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: Number.parseInt(process.env.AI_RATE_LIMIT_MAX, 10) || 30,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    keyGenerator: (req) => String(req.user._id),
    message: {
      success: false,
      message: "You have used all your AI enhancements for now. Try again later.",
    },
  })
);

router.post("/enhance-summary", enhanceSummary);
router.post("/enhance-skills", enhanceSkills);

module.exports = router;