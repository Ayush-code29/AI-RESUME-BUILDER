import {
  ExternalLink,
  FolderKanban,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";

const emptyProject = {
  name: "",
  type: "",
  description: "",
};

const ProjectForm = ({ data, onchange }) => {
  const projects = Array.isArray(data) ? data : [];

  const addProject = () => {
    onchange([...projects, { ...emptyProject }]);
  };

  const removeProject = (index) => {
    onchange(projects.filter((_, itemIndex) => itemIndex !== index));
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = projects.map((project, itemIndex) => {
      if (itemIndex !== index) return project;

      return {
        ...project,
        [field]: value,
      };
    });

    onchange(updatedProjects);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Projects
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          Showcase projects that demonstrate your technical skills and
          experience.
        </p>
      </div>

      <div className="space-y-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-5 bg-gray-50/50"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FolderKanban className="size-4 text-blue-600" />
                </div>

                <h4 className="font-medium text-gray-800">
                  Project {index + 1}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => removeProject(index)}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                title="Remove project"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <FolderKanban className="size-4" />
                  Project Name
                </label>

                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  placeholder="e.g. AI Resume Builder"
                  className="w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <ExternalLink className="size-4" />
                  Project Type / Technologies
                </label>

                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  placeholder="e.g. MERN Stack • React • Node.js • MongoDB"
                  className="w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>

                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder={
                    "Describe the project and your contribution.\nUse a new line for each important point."
                  }
                  className="w-full px-3 py-3 text-sm leading-relaxed"
                />

                <p className="text-xs text-gray-500">
                  Tip: Add 2–4 strong points describing features,
                  technologies and achievements.
                </p>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addProject}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;