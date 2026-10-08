import {
  CalendarDays,
  GraduationCap,
  Plus,
  School,
  Trash2,
} from "lucide-react";
import React from "react";

const emptyEducation = {
  degree: "",
  field: "",
  institution: "",
  gpa: "",
  graduation_date: "",
};

const EducationForm = ({ data, onchange }) => {
  const educationList = Array.isArray(data) ? data : [];

  const addEducation = () => {
    onchange([...educationList, { ...emptyEducation }]);
  };

  const removeEducation = (index) => {
    onchange(
      educationList.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = educationList.map((education, itemIndex) => {
      if (itemIndex !== index) return education;

      return {
        ...education,
        [field]: value,
      };
    });

    onchange(updatedEducation);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Education
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          Add your academic qualifications and educational background.
        </p>
      </div>

      <div className="space-y-5">
        {educationList.map((education, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-5 bg-gray-50/50"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="size-4 text-blue-600" />
                </div>

                <h4 className="font-medium text-gray-800">
                  Education {index + 1}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                title="Remove education"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <GraduationCap className="size-4" />
                  Degree
                </label>

                <input
                  type="text"
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="e.g. B.Tech"
                  className="w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Field of Study
                </label>

                <input
                  type="text"
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  placeholder="e.g. Computer Science"
                  className="w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <School className="size-4" />
                  Institution
                </label>

                <input
                  type="text"
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "institution",
                      e.target.value
                    )
                  }
                  placeholder="e.g. MANIT Bhopal"
                  className="w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  GPA / Percentage
                </label>

                <input
                  type="text"
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  placeholder="e.g. 8.7 CGPA"
                  className="w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CalendarDays className="size-4" />
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
                  className="w-full px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationForm;