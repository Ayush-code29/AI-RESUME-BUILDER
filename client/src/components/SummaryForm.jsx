
import { FileText, Sparkles } from "lucide-react";
import React from "react";

const SummaryForm = ({ data, onchange }) => {
  const summary =
    typeof data?.professional_summary === "string"
      ? data.professional_summary
      : "";

  const handleChange = (value) => {
    onchange({
      ...data,
      professional_summary: value,
    });
  };

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
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <FileText className="size-4" />
          Professional Summary
        </label>

        <textarea
          value={summary}
          onChange={(e) => handleChange(e.target.value)}
          rows={9}
          maxLength={1000}
          placeholder="Example: Motivated Computer Science student with strong experience in React, Node.js and MongoDB. Passionate about building scalable web applications and solving real-world problems."
          className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm leading-relaxed outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

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
