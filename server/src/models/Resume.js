
const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema(
  {
    full_name: { type: String, default: "", trim: true, maxlength: 150 },
    email: { type: String, default: "", trim: true, maxlength: 254 },
    phone: { type: String, default: "", trim: true, maxlength: 40 },
    location: { type: String, default: "", trim: true, maxlength: 200 },
    profession: { type: String, default: "", trim: true, maxlength: 150 },
    linkedin: { type: String, default: "", trim: true, maxlength: 500 },
    website: { type: String, default: "", trim: true, maxlength: 500 },
    image: { type: String, default: "", maxlength: 2000 },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
      default: "Untitled Resume",
    },

    personal_info: {
      type: personalInfoSchema,
      default: () => ({}),
    },

    professional_summary: {
      type: String,
      default: "",
      maxlength: 10000,
    },

    experience: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    education: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    project: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    skills: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    template: {
      type: String,
      enum: ["classic", "minimal"],
      default: "classic",
    },

    accent_color: {
      type: String,
      match: /^#[0-9a-fA-F]{6}$/,
      default: "#3BB2F6",
    },

    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

resumeSchema.index({ user: 1, updatedAt: -1 });

module.exports = mongoose.model("Resume", resumeSchema);