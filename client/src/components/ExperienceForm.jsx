
import {
  BriefcaseBusiness,
  CalendarDays,
  Building2,
  Plus,
  Trash2,
} from "lucide-react";

const emptyExperience = {
  position: "",
  company: "",
  start_date: "",
  end_date: "",
  is_current: false,
  description: "",
};

export default function ExperienceForm({ data, onchange }) {
  const experiences = Array.isArray(data) ? data : [];

  const updateExperiences = (next) => {
    onchange(next);
  };

  const addExperience = () => {
    updateExperiences([
      ...experiences,
      { ...emptyExperience },
    ]);
  };

  const removeExperience = (index) => {
    updateExperiences(
      experiences.filter((_, i) => i !== index)
    );
  };

  const updateExperience = (index, field, value) => {
    updateExperiences(
      experiences.map((experience, i) =>
        i === index
          ? { ...experience, [field]: value }
          : experience
      )
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Work Experience
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Add your professional work experience, internships and relevant
          positions.
        </p>
      </div>

      <div className="space-y-5">
        {experiences.map((experience, index) => (
          <article
            key={index}
            className="rounded-xl border border-gray-200 bg-gray-50/50 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                  <BriefcaseBusiness className="size-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">
                  Experience {index + 1}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => removeExperience(index)}
                aria-label={`Remove experience ${index + 1}`}
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <BriefcaseBusiness size={16} />
                  Job Title
                </label>
                <input
                  type="text"
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  placeholder="e.g. Frontend Developer"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Building2 size={16} />
                  Company
                </label>
                <input
                  type="text"
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  placeholder="e.g. Google"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CalendarDays size={16} />
                  Start Date
                </label>
                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CalendarDays size={16} />
                  End Date
                </label>
                <input
                  type="month"
                  value={experience.end_date || ""}
                  disabled={Boolean(experience.is_current)}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                />
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={Boolean(experience.is_current)}
                onChange={(e) => {
                  const checked = e.target.checked;

                  updateExperiences(
                    experiences.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            is_current: checked,
                            end_date: checked ? "" : item.end_date,
                          }
                        : item
                    )
                  );
                }}
                className="size-4 accent-blue-600"
              />
              I currently work here
            </label>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                value={experience.description || ""}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                rows={5}
                placeholder={"Describe your responsibilities and achievements.\nUse a new line for each point."}
                className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm leading-relaxed outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Write each responsibility or achievement on a separate line.
              </p>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={addExperience}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-semibold text-gray-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
        >
          <Plus size={17} />
          Add Experience
        </button>
      </div>
    </div>
  );
}
