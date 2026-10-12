
const express = require("express");
const router = express.Router();

const {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

// Every resume endpoint requires a valid JWT.
router.use(protect);

router.route("/")
  .post(createResume)
  .get(getAllResumes);

router.route("/:id")
  .all(validateObjectId)
  .get(getResumeById)
  .put(updateResume)
  .patch(updateResume)
  .delete(deleteResume);

module.exports = router;
