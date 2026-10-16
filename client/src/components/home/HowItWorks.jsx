import React from "react";
import { ListChecks } from "lucide-react";
import Title from "./Title";

const steps = [
  {
    title: "Add your details",
    text: "Work through six guided sections: personal info, summary, experience, education, projects and skills.",
  },
  {
    title: "Choose your look",
    text: "Pick a template and an accent colour. The preview updates as you go.",
  },
  {
    title: "Save and download",
    text: "Save your resume to your account and download a PDF to your device.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-50 px-5 py-20 md:px-8">
      <Title
        eyebrow="How it works"
        icon={ListChecks}
        title="From blank page to finished resume in three steps"
        description="No complicated setup. Start typing and your resume takes shape."
      />

      <ol className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <span className="mb-5 inline-flex size-10 items-center justify-center rounded-full bg-green-500 text-lg font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default HowItWorks;
