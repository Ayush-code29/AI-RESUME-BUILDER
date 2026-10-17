import {
  FileText,
  LoaderCircle,
  Sparkles,
  Undo2,
  WandSparkles,
} from "lucide-react";
import React, { useState } from "react";
import { enhanceSummary } from "../api/aiApi";

const MIN_LENGTH = 10;

const SummaryForm = ({ data, onchange }) => {
  const summary =
    typeof data?.professional_summary === "string"
      ? data.professional_summary
      : "";

  const profession = data?.personal_info?.profession || "";

  const [enhancing, setEnhancing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [previousSummary, setPreviousSummary] = useState(null);

  const handleChange = (value) => {
    onchange({
      ...data,
      professional_summary: value,
    });
  };

  const handleTyping = (value) => {
    handleChange(value);
    setError("");
    setNotice("");
    setPreviousSummary(null);
  };

  const handleEnhance = async () => {
    if (enhancing || summary.trim().length < MIN_LENGTH) return;

    setEnhancing(true);
    setError("");
    setNotice("");

    try {
      const enhanced = await enhanceSummary({
        text: summary,
        profession,
      });

      if (enhanced.trim() === summary.trim()) {
        setNotice("Your summary already reads well. No changes needed.");
        setPreviousSummary(null);
      } else {
        setPreviousSummary(summary);
        handleChange(enhanced);
        setNotice("Summary improved with AI.");
      }
    } catch (err) {
      setError(err.message || "AI enhancement failed. Please try again.");
    } finally {
      setEnhancing(false);
    }
  };

  const handleUndo = () => {
    if (previousSummary === null) return;

    handleChange(previousSummary);
    setPreviousSummary(null);
    setNotice("Your original text has been restored.");
  };

  const canEnhance = summary.trim().length >= MIN_LENGTH && !enhancing;

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Professional Summary
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          Write a short professional summary that highlights your experience,
          skills and career goals.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label
            htmlFor="resume-summary"
            className="flex items-center gap-2 text-sm font-medium text-gray-600"
          >
            <FileText className="size-4" />
            Professional Summary
          </label>

          <button
            type="button"
            onClick={handleEnhance}
            disabled={!canEnhance}
            title={
              summary.trim().length < MIN_LENGTH
                ? "Write a few words first, then let AI improve them"
                : "Fix grammar and improve the wording with AI"
            }
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

        <textarea
          id="resume-summary"
          value={summary}
          onChange={(e) => handleTyping(e.target.value)}
          readOnly={enhancing}
          rows={9}
          maxLength={1000}
          placeholder="Example: Motivated Computer Science student with strong experience in React, Node.js and MongoDB. Passionate about building scalable web applications and solving real-world problems."
          className={`w-full rounded-lg border border-gray-300 px-3 py-3 text-sm leading-relaxed outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
            enhancing ? "bg-gray-50 text-gray-500" : ""
          }`}
        />

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        {!error && notice && (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
            <span>{notice}</span>

            {previousSummary !== null && (
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

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Sparkles className="size-3.5" />
            Keep it concise and relevant to your target role.
          </div>

          <span>{summary.length}/1000</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;