import {
  LoaderCircle,
  Plus,
  Sparkles,
  Trash2,
  Undo2,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";
import { enhanceSkills } from "../api/aiApi";

export default function SkillsForm({ data, onchange, profession = "" }) {
  const skills = Array.isArray(data)
    ? data.filter((skill) => typeof skill === "string")
    : [];

  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [enhancing, setEnhancing] = useState(false);
  const [aiError, setAiError] = useState("");
  const [notice, setNotice] = useState("");
  const [previousSkills, setPreviousSkills] = useState(null);

  const handleEnhance = async () => {
    if (enhancing || skills.length === 0) return;

    setEnhancing(true);
    setAiError("");
    setNotice("");

    try {
      const enhanced = await enhanceSkills({ skills, profession });

      const unchanged =
        enhanced.length === skills.length &&
        enhanced.every((skill, index) => skill === skills[index]);

      if (unchanged) {
        setNotice("Your skills already look good. No changes needed.");
        setPreviousSkills(null);
      } else {
        setPreviousSkills(skills);
        onchange(enhanced);
        setNotice("Skills improved with AI.");
      }
    } catch (err) {
      setAiError(err.message || "AI enhancement failed. Please try again.");
    } finally {
      setEnhancing(false);
    }
  };

  const handleUndo = () => {
    if (previousSkills === null) return;

    onchange(previousSkills);
    setPreviousSkills(null);
    setNotice("Your original skills have been restored.");
  };

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
    setNotice("");
    setPreviousSkills(null);
  };

  const removeSkill = (index) => {
    onchange(skills.filter((_, i) => i !== index));
    setError("");
    setNotice("");
    setPreviousSkills(null);
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
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-gray-700">
                Added Skills ({skills.length})
              </p>

              <button
                type="button"
                onClick={handleEnhance}
                disabled={enhancing}
                title="Fix spelling and use standard skill names with AI"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-violet-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {enhancing ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <WandSparkles className="size-4" />
                )}
                {enhancing ? "Enhancing..." : "Enhance with AI"}
              </button>
            </div>

            {aiError && (
              <p role="alert" className="mb-3 text-sm text-red-600">
                {aiError}
              </p>
            )}

            {!aiError && notice && (
              <div className="mb-3 flex items-center justify-between gap-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
                <span>{notice}</span>

                {previousSkills !== null && (
                  <button
                    type="button"
                    onClick={handleUndo}
                    className="inline-flex shrink-0 items-center gap-1 font-semibold text-green-900 underline-offset-2 hover:underline"
                  >
                    <Undo2 className="size-4" />
                    Undo
                  </button>
                )}
              </div>
            )}

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