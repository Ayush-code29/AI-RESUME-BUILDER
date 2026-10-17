import {
  ArrowUpRightIcon,
  CircleAlertIcon,
  ClockIcon,
  FilePenLineIcon,
  FileTextIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  Trash2Icon,
  XIcon,
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

/* ----------------------------- UI helpers ----------------------------- */

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString() : "recently";

/* A tiny paper-like preview that uses the resume's own accent colour. */
function ResumeThumbnail({ color }) {
  return (
    <div className="h-36 w-28 rounded-md bg-white p-3 shadow-lg ring-1 ring-black/5 transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-105">
      <div
        className="mx-auto h-2 w-14 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-slate-200" />
      <div className="my-2.5 h-px" style={{ backgroundColor: color }} />

      <div className="space-y-1.5">
        <div className="h-1 w-8 rounded-full" style={{ backgroundColor: `${color}99` }} />
        <div className="h-1 w-full rounded-full bg-slate-200" />
        <div className="h-1 w-11/12 rounded-full bg-slate-200" />
        <div className="h-1 w-9/12 rounded-full bg-slate-200" />
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="h-1 w-10 rounded-full" style={{ backgroundColor: `${color}99` }} />
        <div className="h-1 w-full rounded-full bg-slate-200" />
        <div className="h-1 w-10/12 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function ResumeCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-44 bg-slate-100" />
      <div className="space-y-2.5 p-4">
        <div className="h-4 w-2/3 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-100" />
      </div>
    </div>
  );
}

/* ------------------------------- Page -------------------------------- */

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
  const [showEditResume, setShowEditResume] = useState(false);

  const [title, setTitle] = useState("");
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

  const openCreateDialog = () => {
    setPageError("");
    setTitle("");
    setShowCreateResume(true);
  };

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

  /* Display-only values */
  const firstName = (user?.name || "User").trim().split(" ")[0];

  const lastUpdated = allResumes.reduce((latest, resume) => {
    if (!resume.updatedAt) return latest;
    return !latest || new Date(resume.updatedAt) > new Date(latest)
      ? resume.updatedAt
      : latest;
  }, null);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* ------------------------------ Header ------------------------------ */}
        <section className="relative isolate overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-24 -z-10 size-80 rounded-full bg-green-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 size-72 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700 ring-1 ring-green-100">
                <span className="size-1.5 rounded-full bg-green-500" />
                Dashboard
              </span>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Welcome back, {firstName}
              </h1>

              <p className="mt-2 max-w-xl text-slate-600">
                Create, edit and download your resumes, all from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateDialog}
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-green-600 px-7 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              <PlusIcon className="size-5 transition-transform duration-300 group-hover:rotate-90" />
              Create Resume
            </button>
          </div>

          <dl className="mt-8 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <FileTextIcon className="size-3.5" />
                Total resumes
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-slate-900">
                {loading ? "–" : allResumes.length}
              </dd>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <ClockIcon className="size-3.5" />
                Last updated
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-slate-900">
                {loading || !lastUpdated ? "–" : formatDate(lastUpdated)}
              </dd>
            </div>
          </dl>
        </section>

        {/* ------------------------------- Error ------------------------------ */}
        {pageError && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
          >
            <CircleAlertIcon className="mt-0.5 size-5 shrink-0" />
            <p className="flex-1">{pageError}</p>
            <button
              type="button"
              onClick={() => setPageError("")}
              aria-label="Dismiss error"
              className="rounded-md p-0.5 text-red-500 transition hover:bg-red-100 hover:text-red-700"
            >
              <XIcon size={17} />
            </button>
          </div>
        )}

        {/* ---------------------------- My Resumes ---------------------------- */}
        <div className="mb-5 mt-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-slate-900">
              My Resumes
            </h2>

            {!loading && allResumes.length > 0 && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {allResumes.length}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={loadAllResumes}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-green-500 hover:bg-green-50 hover:text-green-700"
          >
            <RefreshCwIcon
              className={`size-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {loading ? (
          <div>
            <span className="sr-only">Loading your resumes...</span>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ResumeCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : allResumes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-green-50 text-green-600 ring-1 ring-green-100">
              <FilePenLineIcon className="size-8" />
            </div>

            <p className="mt-6 text-lg font-semibold text-slate-900">
              No resumes yet
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
              Create your first resume to get started. It only takes a few
              minutes.
            </p>

            <button
              type="button"
              onClick={openCreateDialog}
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-green-600 px-6 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition hover:bg-green-700"
            >
              <PlusIcon className="size-5" />
              Create your first resume
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allResumes.map((resume, index) => {
              const fallbackColor = colors[index % colors.length];
              const accent = /^#[0-9a-fA-F]{6}$/.test(resume.accent_color || "")
                ? resume.accent_color
                : fallbackColor;

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
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  {/* Preview area */}
                  <div
                    className="relative flex h-44 items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${accent}14, ${accent}38)`,
                    }}
                  >
                    <ResumeThumbnail color={accent} />

                    <div className="absolute right-3 top-3 flex gap-1.5 opacity-100 transition-opacity duration-200 focus-within:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(event) => handleEdit(event, resume)}
                        className="rounded-lg bg-white/95 p-2 shadow-sm ring-1 ring-black/5 transition hover:bg-white hover:shadow-md"
                        title="Rename Resume"
                        aria-label={`Rename ${resume.title}`}
                      >
                        <PencilIcon
                          className="size-4"
                          style={{ color: accent }}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={(event) => handleDelete(event, resume)}
                        className="rounded-lg bg-white/95 p-2 shadow-sm ring-1 ring-black/5 transition hover:bg-red-50 hover:shadow-md"
                        title="Delete Resume"
                        aria-label={`Delete ${resume.title}`}
                      >
                        <Trash2Icon className="size-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <h3
                        className="truncate font-semibold text-slate-900"
                        title={resume.title}
                      >
                        {resume.title}
                      </h3>

                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                        <ClockIcon className="size-3.5" />
                        Updated {formatDate(resume.updatedAt)}
                      </p>
                    </div>

                    <span
                      className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-white"
                      style={{ "--accent": accent }}
                      aria-hidden="true"
                    >
                      <ArrowUpRightIcon className="size-4" />
                    </span>
                  </div>

                  <div
                    className="h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ backgroundColor: accent }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* --------------------------- Create dialog --------------------------- */}
        {showCreateResume && (
          <form
            onSubmit={handleCreateResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/5 sm:p-8"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 ring-1 ring-green-100">
                <FilePenLineIcon className="size-6" />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-900">
                Create a new resume
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Give your resume a name so you can find it easily later, for
                example “Frontend Developer”.
              </p>

              <label
                htmlFor="create-resume-title"
                className="mb-2 mt-6 block text-sm font-medium text-slate-700"
              >
                Resume title
              </label>

              <input
                id="create-resume-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                maxLength={150}
                placeholder="Enter resume title"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-600/10"
                required
                autoFocus
              />

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateResume(false);
                    setTitle("");
                  }}
                  className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <LoaderCircleIcon className="size-4 animate-spin" />
                  )}
                  {saving ? "Creating..." : "Create Resume"}
                </button>
              </div>

              <button
                type="button"
                aria-label="Close create dialog"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <XIcon className="size-5" />
              </button>
            </div>
          </form>
        )}

        {/* --------------------------- Rename dialog --------------------------- */}
        {showEditResume && (
          <form
            onSubmit={handleUpdateTitle}
            onClick={() => setShowEditResume(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/5 sm:p-8"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 ring-1 ring-green-100">
                <PencilIcon className="size-6" />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-900">
                Rename Resume
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose a new title for this resume.
              </p>

              <label
                htmlFor="rename-resume-title"
                className="mb-2 mt-6 block text-sm font-medium text-slate-700"
              >
                Resume title
              </label>

              <input
                id="rename-resume-title"
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                maxLength={150}
                placeholder="Enter resume title"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-600/10"
                required
                autoFocus
              />

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditResume(false)}
                  className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <LoaderCircleIcon className="size-4 animate-spin" />
                  )}
                  {saving ? "Updating..." : "Update Resume"}
                </button>
              </div>

              <button
                type="button"
                aria-label="Close rename dialog"
                onClick={() => setShowEditResume(false)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <XIcon className="size-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
