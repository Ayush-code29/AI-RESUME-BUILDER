import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({
  selectedTemplate,
  onChange,
}) => {
  const [isopen, setisopen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "A modern, clean design that puts your content front and center.",
    },
  ];

  const selectedTemplateData = templates.find(
    (template) => template.id === selectedTemplate
  );

  const handleTemplateSelect = (templateId) => {
    onChange(templateId);
    setisopen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setisopen((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />

        <span className="max-sm:hidden">
          {selectedTemplateData?.name || "Template"}
        </span>
      </button>

      {isopen && (
        <div className="absolute top-full left-0 w-80 max-w-[calc(100vw-2rem)] p-3 mt-2 space-y-3 z-50 bg-white rounded-md border border-gray-200 shadow-lg">

          {templates.map((template) => (
            <button
              type="button"
              key={template.id}
              onClick={() =>
                handleTemplateSelect(template.id)
              }
              className={`relative w-full text-left p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >

              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1 pr-7">
                <h4 className="font-medium text-gray-800">
                  {template.name}
                </h4>

                <div className="mt-2 p-2 bg-white rounded text-xs text-gray-500 italic border border-gray-100">
                  {template.preview}
                </div>
              </div>

            </button>
          ))}

        </div>
      )}
    </div>
  );
};

export default TemplateSelector;