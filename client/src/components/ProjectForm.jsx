
import {
  ExternalLink,
  FolderKanban,
  Plus,
  Trash2,
} from "lucide-react";

const emptyProject = {
  name: "",
  type: "",
  description: "",
};

export default function ProjectForm({ data, onchange }) {
  const projects = Array.isArray(data) ? data : [];

  const addProject = () => {
    onchange([
      ...projects,
      { ...emptyProject },
    ]);
  };

  const removeProject = (index) => {
    onchange(
      projects.filter((_, i) => i !== index)
    );
  };

  const updateProject = (index, field, value) => {
    onchange(
      projects.map((project, i) =>
        i === index
          ? { ...project, [field]: value }
          : project
      )
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Projects
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Showcase projects that demonstrate your technical skills and
          experience.
        </p>
      </div>

      <div className="space-y-5">
        {projects.map((project, index) => (
          <article
            key={index}
            className="rounded-xl border border-gray-200 bg-gray-50/50 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50">
                  <FolderKanban className="size-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">
                  Project {index + 1}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => removeProject(index)}
                aria-label={`Remove project ${index + 1}`}
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <FolderKanban size={16} />
                  Project Name
                </label>
                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  placeholder="e.g. AI Resume Builder"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <ExternalLink size={16} />
                  Project Type / Technologies
                </label>
                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  placeholder="e.g. MERN Stack • React • Node.js • MongoDB"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  rows={5}
                  placeholder={"Describe the project and your contribution.\nUse a new line for each important point."}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm leading-relaxed outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Add 2–4 points describing features, technologies and
                  achievements.
                </p>
              </div>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={addProject}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-semibold text-gray-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
        >
          <Plus size={17} />
          Add Project
        </button>
      </div>
    </div>
  );
}
