import {
  BriefcaseBusiness,
  CalendarDays,
  Building2,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";

const emptyExperience = {
  position: "",
  company: "",
  start_date: "",
  end_date: "",
  is_current: false,
  description: "",
};

const ExperienceForm = ({ data, onchange }) => {
  const experiences = Array.isArray(data) ? data : [];

  const addExperience = () => {
    onchange([...experiences, { ...emptyExperience }]);
  };

  const removeExperience = (index) => {
    onchange(experiences.filter((_, itemIndex) => itemIndex !== index));
  };

  const updateExperience = (index, field, value) => {
    const updatedExperiences = experiences.map((experience, itemIndex) => {
      if (itemIndex !== index) return experience;

      return {
        ...experience,
        [field]: value,
      };
    });

    onchange(updatedExperiences);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Work Experience
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          Add your professional work experience, internships and relevant
          positions.
        </p>
      </div>

      <div className="space-y-5">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-5 bg-gray-50/50"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <BriefcaseBusiness className="size-4 text-blue-600" />
                </div>

                <h4 className="font-medium text-gray-800">
                  Experience {index + 1}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                title="Remove experience"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <BriefcaseBusiness className="size-4" />
                  Job Title
                </label>

                <input
                  type="text"
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  placeholder="e.g. Frontend Developer"
                  className="w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Building2 className="size-4" />
                  Company
                </label>

                <input
                  type="text"
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  placeholder="e.g. Google"
                  className="w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CalendarDays className="size-4" />
                  Start Date
                </label>

                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CalendarDays className="size-4" />
                  End Date
                </label>

                <input
                  type="month"
                  value={experience.end_date || ""}
                  disabled={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className={`w-full px-3 py-2 text-sm ${
                    experience.is_current
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 mt-4 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(experience.is_current)}
                onChange={(e) => {
                  updateExperience(
                    index,
                    "is_current",
                    e.target.checked
                  );

                  if (e.target.checked) {
                    updateExperience(index, "end_date", "");
                  }
                }}
                className="size-4 accent-blue-600"
              />

              I currently work here
            </label>

            <div className="space-y-1 mt-4">
              <label className="text-sm font-medium text-gray-600">
                Description
              </label>

              <textarea
                value={experience.description || ""}
                onChange={(e) =>
                  updateExperience(
                    index,
                    "description",
                    e.target.value
                  )
                }
                rows={5}
                placeholder={
                  "Describe your responsibilities and achievements.\nUse a new line for each point."
                }
                className="w-full px-3 py-3 text-sm leading-relaxed"
              />

              <p className="text-xs text-gray-500">
                Tip: Write each responsibility or achievement on a separate
                line.
              </p>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addExperience}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;