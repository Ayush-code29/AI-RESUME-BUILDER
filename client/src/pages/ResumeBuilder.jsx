import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
  Save,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import SummaryForm from "../components/SummaryForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import TemplateSelector from "../components/TemplateSelector";
import ExperienceForm from "../components/ExperienceForm";

import {
  createResume,
  updateResume,
} from "../api/resumeApi";

const ResumeBuilder = () => {
  const [resumedata, setResumeData] = useState({
    _id: null,
    title: "My Resume",

    personal_info: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      profession: "",
      linkedin: "",
      website: "",
      image: "",
    },

    professional_summary: "",

    experience: [],

    education: [],

    project: [],

    skills: [],

    template: "classic",

    accent_color: "#3BB2F6",

    public: false,
  });

  const [activeSection, setActiveSection] = useState(0);

  const [saving, setSaving] = useState(false);

  const [saveMessage, setSaveMessage] = useState("");

  const sections = [
    {
      title: "Personal Info",
      key: "personal",
    },
    {
      title: "Summary",
      key: "summary",
    },
    {
      title: "Experience",
      key: "experience",
    },
    {
      title: "Education",
      key: "education",
    },
    {
      title: "Projects",
      key: "projects",
    },
    {
      title: "Skills",
      key: "skills",
    },
  ];

  const handleChange = (data) => {
    setResumeData(data);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveMessage("");

      let response;

      // If resume already exists in MongoDB,
      // update the existing resume.
      if (resumedata._id) {
        response = await updateResume(
          resumedata._id,
          resumedata
        );
      } else {
        // Otherwise create a new resume.
        response = await createResume(resumedata);
      }

      if (response?.resume?._id) {
        setResumeData((previous) => ({
          ...previous,
          _id: response.resume._id,
        }));
      }

      setSaveMessage("Resume saved successfully");

      setTimeout(() => {
        setSaveMessage("");
      }, 3000);
    } catch (error) {
      console.error("Save resume error:", error);

      setSaveMessage(
        error.message || "Failed to save resume"
      );
    } finally {
      setSaving(false);
    }
  };

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection((previous) => previous + 1);
    }
  };

  const previousSection = () => {
    if (activeSection > 0) {
      setActiveSection((previous) => previous - 1);
    }
  };

  const renderActiveSection = () => {
    switch (sections[activeSection].key) {
      case "personal":
        return (
          <PersonalInfoForm
            data={resumedata}
            onchange={handleChange}
          />
        );

      case "summary":
        return (
          <SummaryForm
            data={resumedata}
            onchange={handleChange}
          />
        );

      case "experience":
        return (
          <ExperienceForm
            data={resumedata}
            onchange={handleChange}
          />
        );

      case "education":
        return (
          <EducationForm
            data={resumedata}
            onchange={handleChange}
          />
        );

      case "projects":
        return (
          <ProjectForm
            data={resumedata}
            onchange={handleChange}
          />
        );

      case "skills":
        return (
          <SkillsForm
            data={resumedata}
            onchange={handleChange}
          />
        );

      default:
        return null;
    }
  };

  const progress =
    ((activeSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1600px] px-4 py-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Resume Builder
            </h1>

            <p className="text-sm text-gray-500">
              Build your professional resume
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saveMessage && (
              <div
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${
                  saveMessage.includes("successfully")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {saveMessage.includes("successfully") && (
                  <Check size={16} />
                )}

                {saveMessage}
              </div>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Resume
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">
              {sections[activeSection].title}
            </span>

            <span className="text-gray-500">
              {activeSection + 1} / {sections.length}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: resumedata.accent_color,
              }}
            />
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto rounded-xl bg-white p-2 shadow-sm">
          {sections.map((section, index) => (
            <button
              type="button"
              key={section.key}
              onClick={() => setActiveSection(index)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeSection === index
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {index + 1}. {section.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            {renderActiveSection()}

            <div className="mt-8 flex items-center justify-between border-t pt-5">
              <button
                type="button"
                onClick={previousSection}
                disabled={activeSection === 0}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} />
                Previous
              </button>

              <button
                type="button"
                onClick={nextSection}
                disabled={
                  activeSection === sections.length - 1
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor: resumedata.accent_color,
                }}
              >
                Next
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Resume Preview
              </h2>

              <p className="text-sm text-gray-500">
                Changes appear here automatically
              </p>
            </div>

            <div className="mb-5">
              <TemplateSelector
                template={resumedata.template}
                onChange={(template) =>
                  setResumeData((previous) => ({
                    ...previous,
                    template,
                  }))
                }
                accentColor={resumedata.accent_color}
                setAccentColor={(accent_color) =>
                  setResumeData((previous) => ({
                    ...previous,
                    accent_color,
                  }))
                }
              />
            </div>

            <ResumePreview
              data={resumedata}
              template={resumedata.template}
              accentColor={resumedata.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;