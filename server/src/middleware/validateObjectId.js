
const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid resume ID.",
    });
  }

  next();
};

module.exports = validateObjectId;