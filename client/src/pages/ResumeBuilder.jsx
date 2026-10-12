
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
  Save,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import SummaryForm from "../components/SummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";

import {
  createResume,
  getResume,
  updateResume,
} from "../api/resumeApi";

const createInitialResume = () => ({
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

function normalizeResume(resume = {}) {
  const initial = createInitialResume();

  return {
    ...initial,
    ...resume,
    personal_info: {
      ...initial.personal_info,
      ...(resume.personal_info || {}),
    },
    professional_summary:
      typeof resume.professional_summary === "string"
        ? resume.professional_summary
        : "",
    experience: Array.isArray(resume.experience)
      ? resume.experience
      : [],
    education: Array.isArray(resume.education)
      ? resume.education
      : [],
    project: Array.isArray(resume.project)
      ? resume.project
      : [],
    skills: Array.isArray(resume.skills)
      ? resume.skills.filter((skill) => typeof skill === "string")
      : [],
  };
}

export default function ResumeBuilder() {
  const { resumeId } = useParams();

  const [resumedata, setResumeData] = useState(createInitialResume);
  const [activeSection, setActiveSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const sections = [
    { title: "Personal Information", key: "personal" },
    { title: "Professional Summary", key: "summary" },
    { title: "Work Experience", key: "experience" },
    { title: "Education", key: "education" },
    { title: "Projects", key: "projects" },
    { title: "Skills", key: "skills" },
  ];

  useEffect(() => {
    let cancelled = false;

    async function loadResume() {
      setLoading(true);
      setSaveMessage("");

      if (!resumeId || resumeId === "new") {
        setResumeData(createInitialResume());
        setActiveSection(0);
        setLoading(false);
        return;
      }

      try {
        const result = await getResume(resumeId);

        if (!cancelled) {
          setResumeData(normalizeResume(result));
          setActiveSection(0);
        }
      } catch (error) {
        if (!cancelled) {
          setMessageType("error");
          setSaveMessage(error.message || "Unable to load resume.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadResume();

    return () => {
      cancelled = true;
    };
  }, [resumeId]);

  // Merge partial updates instead of replacing the complete resume.
  const handleChange = (updates) => {
    setResumeData((previous) => ({
      ...previous,
      ...updates,
      personal_info: {
        ...previous.personal_info,
        ...(updates.personal_info || {}),
      },
    }));

    setSaveMessage("");
  };

  const handleSave = async () => {
    if (saving) return;

    setSaving(true);
    setSaveMessage("");

    try {
      const payload = normalizeResume(resumedata);

      const savedResume = payload._id
        ? await updateResume(payload._id, payload)
        : await createResume(payload);

      if (!savedResume) {
        throw new Error("The server did not return the saved resume.");
      }

      setResumeData((previous) =>
        normalizeResume({
          ...previous,
          ...savedResume,
          _id: savedResume._id || previous._id,
        })
      );

      setMessageType("success");
      setSaveMessage("Resume saved successfully.");
    } catch (error) {
      setMessageType("error");
      setSaveMessage(error.message || "Failed to save resume.");
    } finally {
      setSaving(false);
    }
  };

  const goToSection = (index) => {
    setActiveSection(
      Math.max(0, Math.min(index, sections.length - 1))
    );
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
            data={resumedata.experience}
            onchange={(experience) => handleChange({ experience })}
          />
        );

      case "education":
        return (
          <EducationForm
            data={resumedata.education}
            onchange={(education) => handleChange({ education })}
          />
        );

      case "projects":
        return (
          <ProjectForm
            data={resumedata.project}
            onchange={(project) => handleChange({ project })}
          />
        );

      case "skills":
        return (
          <SkillsForm
            data={resumedata.skills}
            onchange={(skills) => handleChange({ skills })}
          />
        );

      default:
        return null;
    }
  };

  const progress = ((activeSection + 1) / sections.length) * 100;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-gray-500">
        <LoaderCircle size={22} className="animate-spin" />
        Loading your resume...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Resume Builder
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Build and customize your professional resume.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {saveMessage && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm ${
                  messageType === "success"
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {messageType === "success" && (
                  <Check size={16} className="mr-1 inline" />
                )}
                {saveMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
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
        </header>

        <section className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-gray-800">
              {sections[activeSection].title}
            </span>
            <span className="text-sm text-gray-500">
              Step {activeSection + 1} of {sections.length}
            </span>
          </div>

          <div
            className="h-2 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: resumedata.accent_color || "#3BB2F6",
              }}
            />
          </div>

          <nav
            aria-label="Resume sections"
            className="mt-4 flex gap-2 overflow-x-auto pb-1"
          >
            {sections.map((section, index) => (
              <button
                key={section.key}
                type="button"
                onClick={() => goToSection(index)}
                aria-current={activeSection === index ? "step" : undefined}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  activeSection === index
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {index + 1}. {section.title}
              </button>
            ))}
          </nav>
        </section>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
          <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
            {renderActiveSection()}

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-200 pt-5">
              <button
                type="button"
                onClick={() => goToSection(activeSection - 1)}
                disabled={activeSection === 0}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} />
                Previous
              </button>

              <button
                type="button"
                onClick={() => goToSection(activeSection + 1)}
                disabled={activeSection === sections.length - 1}
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor: resumedata.accent_color || "#3BB2F6",
                }}
              >
                Next
                <ArrowRight size={17} />
              </button>
            </div>
          </section>

          <aside className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Resume Preview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your changes appear here as you edit.
              </p>
            </div>

            <div className="mb-5">
              <TemplateSelector
                template={resumedata.template}
                onChange={(template) =>
                  handleChange({ template })
                }
                accentColor={resumedata.accent_color}
                setAccentColor={(accent_color) =>
                  handleChange({ accent_color })
                }
              />
            </div>

            <ResumePreview
              data={resumedata}
              template={resumedata.template}
              accentColor={resumedata.accent_color}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
