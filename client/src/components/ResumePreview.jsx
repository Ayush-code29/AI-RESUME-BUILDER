import React from "react";
import ClassicTemplate from "./MinimalImageTemplate";
import MinimalTemplate from "./ModernTemplate";

const ResumePreview = ({
  data,
  template,
  accentColor,
  classes = "",
}) => {
  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return (
          <MinimalTemplate
            data={data}
            accentColor={accentColor}
          />
        );

      case "classic":
        return (
          <ClassicTemplate
            data={data}
            accentColor={accentColor}
          />
        );

      default:
        return (
          <ClassicTemplate
            data={data}
            accentColor={accentColor}
          />
        );
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded-xl p-4">
      <div
        id="resume-preview"
        className={`w-full min-h-[1050px] bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden print:shadow-none print:border-none print:rounded-none ${classes}`}
      >
        {renderTemplate()}
      </div>

      <style>{`
        @page {
          size: letter;
          margin: 0;
        }

        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          #resume-preview {
            width: 100%;
            min-height: auto;
            box-shadow: none;
            border: none;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;