
const express = require("express");
const router = express.Router();

const {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const validateObjectId = require("../middleware/validateObjectId");

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