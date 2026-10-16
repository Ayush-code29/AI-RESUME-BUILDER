import {
  FilePenLineIcon,
  PlusIcon,
  UploadCloudIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  UploadCloud,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createResume as createResumeApi,
  getAllResumes,
  updateResume as updateResumeApi,
  deleteResume as deleteResumeApi,
} from "../api/resumeApi";

import { useAuth } from "../context/AuthContext";

const createInitialResume = (title) => ({
  title,
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

export default function Dashboard() {
  const colors = [
    "#9333ea",
    "#d97706",
    "#dc2626",
    "#0284c7",
    "#16a34a",
  ];

  const navigate = useNavigate();
  const { user } = useAuth();

  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState("");

  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [showEditResume, setShowEditResume] = useState(false);

  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [editResumeId, setEditResumeId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const loadAllResumes = async () => {
    setLoading(true);
    setPageError("");

    try {
      const resumes = await getAllResumes();
      setAllResumes(resumes);
    } catch (error) {
      setPageError(error.message || "Unable to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const handleCreateResume = async (event) => {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setPageError("Please enter a resume title.");
      return;
    }

    setSaving(true);
    setPageError("");

    try {
      const created = await createResumeApi(
        createInitialResume(cleanTitle)
      );

      setShowCreateResume(false);
      setTitle("");

      navigate(`/app/builder/${created._id}`);
    } catch (error) {
      setPageError(error.message || "Failed to create resume.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event, resume) => {
    event.stopPropagation();
    setEditResumeId(resume._id);
    setEditTitle(resume.title || "");
    setShowEditResume(true);
    setPageError("");
  };

  const handleUpdateTitle = async (event) => {
    event.preventDefault();

    if (!editTitle.trim()) {
      setPageError("Please enter a resume title.");
      return;
    }

    setSaving(true);
    setPageError("");

    try {
      await updateResumeApi(editResumeId, {
        title: editTitle.trim(),
      });

      setShowEditResume(false);
      setEditResumeId(null);
      setEditTitle("");

      await loadAllResumes();
    } catch (error) {
      setPageError(error.message || "Failed to rename resume.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (event, resume) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete "${resume.title}"?`
    );

    if (!confirmed) return;

    setPageError("");

    try {
      await deleteResumeApi(resume._id);

      setAllResumes((previous) =>
        previous.filter((item) => item._id !== resume._id)
      );
    } catch (error) {
      setPageError(error.message || "Failed to delete resume.");
    }
  };

  const handleOpenResume = (resume) => {
    navigate(`/app/builder/${resume._id}`);
  };

  const handleUploadNotice = (event) => {
    event.preventDefault();
    setPageError(
      "PDF import is not connected to the backend yet. You can create a new resume and enter your details manually."
    );
    setShowUploadResume(false);
    setResumeFile(null);
    setTitle("");
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-2xl font-medium text-transparent sm:hidden">
          Welcome, {user?.name || "User"}
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setPageError("");
              setTitle("");
              setShowCreateResume(true);
            }}
            className="group flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white text-slate-600 transition-all duration-300 hover:border-indigo-500 hover:shadow-lg sm:max-w-36"
          >
            <PlusIcon className="size-11 rounded-full bg-linear-to-br from-indigo-600 to-indigo-800 p-2.5 text-white transition-all duration-300" />
            <p className="text-sm transition-all duration-300 group-hover:text-indigo-600">
              Create Resume
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setPageError("");
              setShowUploadResume(true);
            }}
            className="group flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white text-slate-600 transition-all duration-300 hover:border-purple-500 hover:shadow-lg sm:max-w-36"
          >
            <UploadCloudIcon className="size-11 rounded-full bg-linear-to-br from-purple-600 to-purple-800 p-2.5 text-white transition-all duration-300" />
            <p className="text-sm transition-all duration-300 group-hover:text-purple-600">
              Upload Existing
            </p>
          </button>
        </div>

        {pageError && (
          <div
            role="alert"
            className="mt-5 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <p>{pageError}</p>
            <button
              type="button"
              onClick={() => setPageError("")}
              aria-label="Dismiss error"
            >
              <XIcon size={17} />
            </button>
          </div>
        )}

        <hr className="my-6 border-slate-300 sm:w-[350px]" />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            My Resumes
          </h2>
          <button
            type="button"
            onClick={loadAllResumes}
            className="text-sm text-indigo-600 hover:underline"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="py-10 text-sm text-slate-500">
            Loading your resumes...
          </p>
        ) : allResumes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <FilePenLineIcon className="mx-auto mb-3 size-9 text-slate-400" />
            <p className="font-medium text-slate-700">
              No resumes yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Create your first resume to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap">
            {allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];

              return (
                <div
                  key={resume._id}
                  onClick={() => handleOpenResume(resume)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleOpenResume(resume);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="group relative flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border transition-all duration-300 hover:shadow-lg sm:max-w-36"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                    borderColor: `${baseColor}40`,
                  }}
                >
                  <div className="absolute right-2 top-2 flex gap-1 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={(event) => handleEdit(event, resume)}
                      className="rounded-md bg-white p-1.5 shadow-sm hover:bg-slate-100"
                      title="Rename Resume"
                      aria-label={`Rename ${resume.title}`}
                    >
                      <PencilIcon
                        className="size-3.5"
                        style={{ color: baseColor }}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={(event) => handleDelete(event, resume)}
                      className="rounded-md bg-white p-1.5 shadow-sm hover:bg-red-50"
                      title="Delete Resume"
                      aria-label={`Delete ${resume.title}`}
                    >
                      <Trash2Icon className="size-3.5 text-red-500" />
                    </button>
                  </div>

                  <FilePenLineIcon
                    className="size-7 transition-all group-hover:scale-105"
                    style={{ color: baseColor }}
                  />

                  <p
                    className="px-2 text-center text-sm transition-all group-hover:scale-105"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>

                  <p
                    className="absolute bottom-1 px-2 text-center text-[11px]"
                    style={{ color: `${baseColor}90` }}
                  >
                    Updated{" "}
                    {resume.updatedAt
                      ? new Date(resume.updatedAt).toLocaleDateString()
                      : "recently"}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {showCreateResume && (
          <form
            onSubmit={handleCreateResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-sm rounded-lg border bg-slate-50 p-6 shadow-md"
            >
              <h2 className="mb-4 text-xl font-bold">
                Create a Resume
              </h2>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                maxLength={150}
                placeholder="Enter resume title"
                className="mb-4 w-full rounded border border-slate-300 px-4 py-2 focus:border-green-600 focus:outline-none"
                required
                autoFocus
              />

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded bg-green-600 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-60"
              >
                {saving ? "Creating..." : "Create Resume"}
              </button>

              <button
                type="button"
                aria-label="Close create dialog"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              >
                <XIcon />
              </button>
            </div>
          </form>
        )}

        {showEditResume && (
          <form
            onSubmit={handleUpdateTitle}
            onClick={() => setShowEditResume(false)}
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-sm rounded-lg border bg-slate-50 p-6 shadow-md"
            >
              <h2 className="mb-4 text-xl font-bold">Rename Resume</h2>

              <input
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                maxLength={150}
                placeholder="Enter resume title"
                className="mb-4 w-full rounded border border-slate-300 px-4 py-2 focus:border-green-600 focus:outline-none"
                required
                autoFocus
              />

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update Resume"}
              </button>

              <button
                type="button"
                aria-label="Close rename dialog"
                onClick={() => setShowEditResume(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              >
                <XIcon />
              </button>
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={handleUploadNotice}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-sm rounded-lg border bg-slate-50 p-6 shadow-md"
            >
              <h2 className="mb-4 text-xl font-bold">Upload Resume</h2>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                maxLength={150}
                placeholder="Enter resume title"
                className="mb-4 w-full rounded border border-slate-300 px-4 py-2"
                required
              />

              <label
                htmlFor="resume-input"
                className="block cursor-pointer text-sm text-slate-700"
              >
                Select PDF file
                <div className="my-4 flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-400 p-8 text-slate-400 hover:border-green-500 hover:text-green-700">
                  <UploadCloud className="size-12 stroke-1" />
                  <p>{resumeFile?.name || "Choose a PDF file"}</p>
                </div>
              </label>

              <input
                type="file"
                id="resume-input"
                accept=".pdf,application/pdf"
                hidden
                onChange={(event) =>
                  setResumeFile(event.target.files?.[0] || null)
                }
              />

              <p className="mb-4 text-xs text-slate-500">
                PDF content extraction is not supported by the current
                backend yet.
              </p>

              <button
                type="submit"
                className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
              >
                Close
              </button>

              <button
                type="button"
                aria-label="Close upload dialog"
                onClick={() => setShowUploadResume(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              >
                <XIcon />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
