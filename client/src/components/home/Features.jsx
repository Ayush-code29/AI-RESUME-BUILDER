
import React from "react";
import {
  Eye,
  FileDown,
  FolderOpen,
  LayoutTemplate,
  Palette,
  ShieldCheck,
} from "lucide-react";
import Title from "./Title";

const features = [
  {
    icon: Eye,
    title: "A preview that keeps up",
    text: "See your resume take shape as you edit. No guessing, no last-minute formatting surprises.",
  },
  {
    icon: LayoutTemplate,
    title: "Layouts with purpose",
    text: "Choose a clean, professional template that lets your experience do the talking.",
  },
  {
    icon: Palette,
    title: "A little personality",
    text: "Use a considered accent colour to make the details feel like yours, without overdoing it.",
  },
  {
    icon: FileDown,
    title: "Ready when you are",
    text: "Export a polished PDF to share with recruiters, hiring teams, or your next opportunity.",
  },
  {
    icon: FolderOpen,
    title: "Every version, organised",
    text: "Keep resumes tailored to different roles together in one convenient dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Your work, your account",
    text: "Sign in to save your resumes and return to them whenever you need to make an update.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-y border-slate-100 bg-[#fafbf8] px-5 py-20 md:px-8 md:py-28"
    >
      <Title
        eyebrow="Less formatting. More focus."
        title="The details are taken care of."
        description="Everything you need to put your experience forward clearly — without fighting with a document editor."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }, index) => (
          <article
            key={title}
            className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#c9dca9] hover:shadow-[0_16px_40px_-28px_rgba(35,55,25,.28)] sm:p-7"
          >
            <div className="mb-9 flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#f0f6e8] text-[#587c2c] transition group-hover:bg-[#dff0c1]">
                <Icon size={20} strokeWidth={1.7} />
              </span>

              <span className="text-xs tabular-nums text-slate-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Features;
