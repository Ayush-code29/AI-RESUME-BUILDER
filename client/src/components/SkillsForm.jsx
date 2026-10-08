import {
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";

const SkillsForm = ({ data, onchange }) => {
  const skills = Array.isArray(data) ? data : [];

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    const alreadyExists = skills.some(
      (existingSkill) =>
        existingSkill.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      setSkillInput("");
      return;
    }

    onchange([...skills, skill]);
    setSkillInput("");
  };

  const removeSkill = (index) => {
    onchange(skills.filter((_, skillIndex) => skillIndex !== index));
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

        <p className="text-sm text-gray-600 mt-1">
          Add technical and professional skills relevant to your target role.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Sparkles className="size-4" />
            Add Skill
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. React.js"
              className="flex-1 px-3 py-2 text-sm"
            />

            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-2 text-sm"
            >
              <Plus className="size-4" />
              Add
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Press Enter or click Add to add a skill.
          </p>
        </div>

        {skills.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">
              Added Skills
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-700"
                >
                  <span>{skill}</span>

                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-blue-500 hover:text-red-500 transition-all"
                    title={`Remove ${skill}`}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length === 0 && (
          <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Sparkles className="size-8 mx-auto text-gray-300 mb-2" />

            <p className="text-sm text-gray-500">
              No skills added yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;