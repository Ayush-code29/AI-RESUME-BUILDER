
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, LoaderCircle, Printer } from "lucide-react";

import { getResume } from "../api/resumeApi";
import ResumePreview from "../components/ResumePreview";

export default function Preview() {
  const { resumeId } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const result = await getResume(resumeId);

        if (!cancelled) {
          setResume(result);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message || "Could not load this resume.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [resumeId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 text-gray-500">
        <LoaderCircle size={20} className="animate-spin" />
        Loading preview...
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-red-600">
          {error || "Resume not found."}
        </p>
        <Link
          to="/app"
          className="mt-5 inline-flex items-center gap-2 text-indigo-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="mx-auto mb-5 flex max-w-5xl items-center justify-between">
        <Link
          to={`/app/builder/${resume._id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to editor
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          <Printer size={17} />
          Print / Save PDF
        </button>
      </div>

      <div className="mx-auto max-w-5xl">
        <ResumePreview
          data={resume}
          template={resume.template}
          accentColor={resume.accent_color}
        />
      </div>
    </div>
  );
}
