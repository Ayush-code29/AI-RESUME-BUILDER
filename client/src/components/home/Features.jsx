import React from "react";
import {
  Eye,
  FileDown,
  FolderOpen,
  LayoutTemplate,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Title from "./Title";

const features = [
  {
    icon: Eye,
    title: "Live preview",
    text: "See every change appear on your resume instantly while you type, so there are no surprises later.",
  },
  {
    icon: LayoutTemplate,
    title: "Clean templates",
    text: "Switch between professional layouts at any time. Your content stays, only the design changes.",
  },
  {
    icon: Palette,
    title: "Custom accent colour",
    text: "Pick a colour that matches your style and apply it across headings and highlights in one click.",
  },
  {
    icon: FileDown,
    title: "One-click PDF",
    text: "Download a ready-to-send PDF straight to your device when your resume is finished.",
  },
  {
    icon: FolderOpen,
    title: "Multiple resumes",
    text: "Keep a separate version for each role and edit any of them later from your dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    text: "Your resumes live in your own account and stay private unless you decide otherwise.",
  },
];

const Features = () => {
  return (
    <section id="features" className="scroll-mt-4 bg-white px-5 py-20 md:px-8">
      <Title
        eyebrow="Features"
        icon={Sparkles}
        title="Everything you need to build a great resume"
        description="Simple tools that take care of the formatting, so you can focus on what you want to say."
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg hover:shadow-green-900/5"
          >
            <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-500 group-hover:text-white">
              <Icon size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
