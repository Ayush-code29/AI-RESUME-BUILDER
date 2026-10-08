import { FileText, Sparkles } from "lucide-react";
import React from "react";

const SummaryForm = ({ data, onchange }) => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Professional Summary
        </h3>

        <p className="text-sm text-gray-600 mt-1">
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
          value={data || ""}
          onChange={(e) => onchange(e.target.value)}
          rows={9}
          maxLength={1000}
          placeholder="Example: Motivated Computer Science student with strong experience in React, Node.js and MongoDB. Passionate about building scalable web applications and solving real-world problems."
          className="w-full px-3 py-3 text-sm leading-relaxed"
        />

        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Sparkles className="size-3.5" />
            Keep it concise and relevant to your target role.
          </div>

          <span>{(data || "").length}/1000</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;