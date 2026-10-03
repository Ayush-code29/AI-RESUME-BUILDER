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

const Dashboard = () => {
  const colors = [
    "#9333ea",
    "#d97706",
    "#dc2626",
    "#0284c7",
    "#16a34a",
  ];

  const [allResumes, setAllResumes] = useState([]);

  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [showEditResume, setShowEditResume] = useState(false);

  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);

  const [editResumeId, setEditResumeId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  // =========================
  // CREATE RESUME
  // =========================

  const createResume = async (event) => {
    event.preventDefault();

    setShowCreateResume(false);

    navigate("/app/builder/res123");
  };

  // =========================
  // UPLOAD RESUME
  // =========================

  const uploadResume = async (event) => {
    event.preventDefault();

    setShowUploadResume(false);

    navigate("/app/builder/res123");
  };

  // =========================
  // LOAD ALL RESUMES
  // =========================

  const loadAllResumes = async () => {
    const resumes = [
      {
        id: 1,
        title: "Software Developer Resume",
        updatedAt: "2026-10-01",
      },
      {
        id: 2,
        title: "Frontend Developer Resume",
        updatedAt: "2026-09-28",
      },
      {
        id: 3,
        title: "MERN Stack Resume",
        updatedAt: "2026-09-25",
      },
    ];

    setAllResumes(resumes);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  // =========================
  // OPEN RESUME
  // =========================

  const handleOpenResume = (resume) => {
    navigate(`/app/builder/${resume.id}`);
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEdit = (event, resume) => {
    event.stopPropagation();

    setEditResumeId(resume.id);
    setEditTitle(resume.title);

    setShowEditResume(true);
  };

  // =========================
  // UPDATE RESUME
  // =========================

  const updateResume = async (event) => {
    event.preventDefault();

    setAllResumes((prevResumes) =>
      prevResumes.map((item) =>
        item.id === editResumeId
          ? {
              ...item,
              title: editTitle,
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );

    setShowEditResume(false);

    navigate(`/app/builder/${editResumeId}`);
  };

  // =========================
  // DELETE RESUME
  // =========================

  const handleDelete = (event, resume) => {
    event.stopPropagation();

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${resume.title}"?`
    );

    if (!confirmDelete) return;

    setAllResumes((prevResumes) =>
      prevResumes.filter((item) => item.id !== resume.id)
    );
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* =========================
            WELCOME
        ========================= */}

        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Ayush
        </p>

        {/* =========================
            CREATE + UPLOAD
        ========================= */}

        <div className="flex gap-4">

          {/* CREATE RESUME */}

          <button
            onClick={() => {
              setShowCreateResume(true);
            }}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 p-2.5 bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-full transition-all duration-300" />

            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          {/* UPLOAD EXISTING */}

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-linear-to-br from-purple-600 to-purple-800 text-white rounded-full transition-all duration-300" />

            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        {/* DIVIDER */}

        <hr className="border-slate-300 my-6 sm:w-[350px]" />

        {/* =========================
            RESUME CARDS
        ========================= */}

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">

          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <div
                key={resume.id}
                onClick={() => handleOpenResume(resume)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: `${baseColor}40`,
                }}
              >

                {/* EDIT + DELETE */}

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">

                  {/* EDIT */}

                  <button
                    onClick={(event) => handleEdit(event, resume)}
                    className="p-1.5 bg-white rounded-md shadow-sm hover:bg-slate-100 transition-all cursor-pointer"
                    title="Edit Resume"
                  >
                    <PencilIcon
                      className="size-3.5"
                      style={{ color: baseColor }}
                    />
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={(event) => handleDelete(event, resume)}
                    className="p-1.5 bg-white rounded-md shadow-sm hover:bg-red-50 transition-all cursor-pointer"
                    title="Delete Resume"
                  >
                    <Trash2Icon className="size-3.5 text-red-500" />
                  </button>

                </div>

                {/* RESUME ICON */}

                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />

                {/* TITLE */}

                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                {/* UPDATED DATE */}

                <p
                  className="absolute bottom-1 text-[11px] px-2 text-center"
                  style={{ color: `${baseColor}90` }}
                >
                  Updated on{" "}
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

              </div>
            );
          })}

        </div>

        {/* =========================
            CREATE RESUME MODAL
        ========================= */}

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => {
              setShowCreateResume(false);
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Create a Resume
              </h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border border-slate-300 rounded focus:outline-none focus:border-green-600"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* =========================
            UPLOAD RESUME MODAL
        ========================= */}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => {
              setShowUploadResume(false);
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Upload Resume
              </h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border border-slate-300 rounded focus:outline-none focus:border-green-600"
                required
              />

              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select resume file

                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-green-700">
                        {resume.name}
                      </p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>

                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) =>
                    setResume(e.target.files[0])
                  }
                />
              </div>

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Upload Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume(null);
                }}
              />
            </div>
          </form>
        )}

        {/* =========================
            EDIT RESUME MODAL
        ========================= */}

        {showEditResume && (
          <form
            onSubmit={updateResume}
            onClick={() => {
              setShowEditResume(false);
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Edit Resume
              </h2>

              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border border-slate-300 rounded focus:outline-none focus:border-green-600"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Update Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowEditResume(false);
                  setEditTitle("");
                  setEditResumeId(null);
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;