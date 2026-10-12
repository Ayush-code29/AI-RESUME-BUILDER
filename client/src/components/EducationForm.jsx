
import {
  CalendarDays,
  GraduationCap,
  Plus,
  School,
  Trash2,
} from "lucide-react";

const emptyEducation = {
  degree: "",
  field: "",
  institution: "",
  gpa: "",
  graduation_date: "",
};

export default function EducationForm({ data, onchange }) {
  const educationList = Array.isArray(data) ? data : [];

  const addEducation = () => {
    onchange([
      ...educationList,
      { ...emptyEducation },
    ]);
  };

  const removeEducation = (index) => {
    onchange(
      educationList.filter((_, i) => i !== index)
    );
  };

  const updateEducation = (index, field, value) => {
    onchange(
      educationList.map((education, i) =>
        i === index
          ? { ...education, [field]: value }
          : education
      )
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Education
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Add your academic qualifications and educational background.
        </p>
      </div>

      <div className="space-y-5">
        {educationList.map((education, index) => (
          <article
            key={index}
            className="rounded-xl border border-gray-200 bg-gray-50/50 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                  <GraduationCap className="size-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">
                  Education {index + 1}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => removeEducation(index)}
                aria-label={`Remove education ${index + 1}`}
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <GraduationCap size={16} />
                  Degree
                </label>
                <input
                  type="text"
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="e.g. B.Tech"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <School size={16} />
                  Institution
                </label>
                <input
                  type="text"
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  placeholder="e.g. MANIT Bhopal"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  GPA / Percentage
                </label>
                <input
                  type="text"
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  placeholder="e.g. 8.7 CGPA"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CalendarDays size={16} />
                  Graduation Date
                </label>
                <input
                  type="month"
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "graduation_date",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-semibold text-gray-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
        >
          <Plus size={17} />
          Add Education
        </button>
      </div>
    </div>
  );
}
