
const Resume = require("../models/Resume");
const asyncHandler = require("../utils/asyncHandler");

const allowedFields = [
  "title",
  "personal_info",
  "professional_summary",
  "experience",
  "education",
  "project",
  "skills",
  "template",
  "accent_color",
  "public",
];

const personalFields = [
  "full_name",
  "email",
  "phone",
  "location",
  "profession",
  "linkedin",
  "website",
  "image",
];

const badRequest = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

const validatePayload = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw badRequest("Request body must be a JSON object.");
  }

  const unsupported = Object.keys(body).filter(
    (key) => !allowedFields.includes(key)
  );

  if (unsupported.length) {
    throw badRequest(`Unsupported fields: ${unsupported.join(", ")}.`);
  }

  if (body.title !== undefined) {
    if (
      typeof body.title !== "string" ||
      !body.title.trim() ||
      body.title.trim().length > 150
    ) {
      throw badRequest("Title must contain 1–150 characters.");
    }

    body.title = body.title.trim();
  }

  if (body.personal_info !== undefined) {
    if (
      !body.personal_info ||
      typeof body.personal_info !== "object" ||
      Array.isArray(body.personal_info)
    ) {
      throw badRequest("personal_info must be an object.");
    }

    const unsupportedPersonalFields = Object.keys(
      body.personal_info
    ).filter((key) => !personalFields.includes(key));

    if (unsupportedPersonalFields.length) {
      throw badRequest(
        `Unsupported personal_info fields: ${unsupportedPersonalFields.join(", ")}.`
      );
    }

    for (const [key, value] of Object.entries(body.personal_info)) {
      if (typeof value !== "string") {
        throw badRequest(`personal_info.${key} must be a string.`);
      }
    }
  }

  if (body.professional_summary !== undefined) {
    if (
      typeof body.professional_summary !== "string" ||
      body.professional_summary.length > 10000
    ) {
      throw badRequest(
        "professional_summary must be a string of at most 10000 characters."
      );
    }
  }

  for (const key of ["experience", "education", "project", "skills"]) {
    if (body[key] !== undefined) {
      if (!Array.isArray(body[key]) || body[key].length > 100) {
        throw badRequest(
          `${key} must be an array containing at most 100 items.`
        );
      }
    }
  }

  if (
    body.template !== undefined &&
    !["classic", "minimal"].includes(body.template)
  ) {
    throw badRequest("template must be classic or minimal.");
  }

  if (
    body.accent_color !== undefined &&
    (typeof body.accent_color !== "string" ||
      !/^#[0-9a-fA-F]{6}$/.test(body.accent_color))
  ) {
    throw badRequest("accent_color must be a valid hex color.");
  }

  if (body.public !== undefined && typeof body.public !== "boolean") {
    throw badRequest("public must be a boolean.");
  }
};

const createResume = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  validatePayload(payload);

  // Ownership is taken from the verified JWT, never from the request body.
  const resume = await Resume.create({
    ...payload,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Resume created successfully.",
    data: resume,
  });
});

const getAllResumes = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(req.query.limit, 10) || 10)
  );

  const filter = { user: req.user._id };

  const [resumes, total] = await Promise.all([
    Resume.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Resume.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: resumes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).lean();

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: resume,
  });
});

const updateResume = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  validatePayload(payload);

  if (Object.keys(payload).length === 0) {
    throw badRequest("Provide at least one field to update.");
  }

  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found.",
    });
  }

  for (const [key, value] of Object.entries(payload)) {
    if (key === "personal_info") {
      const existingInfo = resume.personal_info?.toObject
        ? resume.personal_info.toObject()
        : {};

      resume.set("personal_info", {
        ...existingInfo,
        ...value,
      });
    } else {
      resume.set(key, value);
    }
  }

  await resume.save();

  res.status(200).json({
    success: true,
    message: "Resume updated successfully.",
    data: resume,
  });
});

const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Resume deleted successfully.",
    data: { id: resume._id },
  });
});

module.exports = {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
};