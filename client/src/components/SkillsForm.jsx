
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SkillsForm({ data, onchange }) {
  const skills = Array.isArray(data)
    ? data.filter((skill) => typeof skill === "string")
    : [];

  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) {
      setError("Please enter a skill first.");
      return;
    }

    const alreadyExists = skills.some(
      (existingSkill) =>
        existingSkill.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      setError("This skill has already been added.");
      return;
    }

    onchange([...skills, skill]);
    setSkillInput("");
    setError("");
  };

  const removeSkill = (index) => {
    onchange(skills.filter((_, i) => i !== index));
    setError("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Add technical and professional skills relevant to your target role.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="resume-skill-input"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600"
          >
            <Sparkles size={16} />
            Add Skill
          </label>

          <div className="flex gap-2">
            <input
              id="resume-skill-input"
              type="text"
              value={skillInput}
              onChange={(e) => {
                setSkillInput(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. React.js"
              maxLength={60}
              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={addSkill}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={17} />
              Add
            </button>
          </div>

          {error ? (
            <p role="alert" className="mt-2 text-xs text-red-600">
              {error}
            </p>
          ) : (
            <p className="mt-2 text-xs text-gray-500">
              Press Enter or click Add to add a skill.
            </p>
          )}
        </div>

        {skills.length > 0 ? (
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-700">
              Added Skills ({skills.length})
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-blue-800"
                >
                  <span>{skill}</span>

                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    aria-label={`Remove ${skill}`}
                    className="rounded p-0.5 text-blue-500 transition hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <Sparkles size={30} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-gray-500">
              No skills added yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
