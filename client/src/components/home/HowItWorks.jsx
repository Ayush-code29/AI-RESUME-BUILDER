
import React from "react";
import { ArrowRight } from "lucide-react";
import Title from "./Title";

const steps = [
  {
    number: "01",
    title: "Start with your story",
    text: "Add your contact details, summary, experience, education, projects and skills at your own pace.",
  },
  {
    number: "02",
    title: "Make it feel right",
    text: "Choose a template and accent colour. Your live preview helps you fine-tune the details.",
  },
  {
    number: "03",
    title: "Take it with you",
    text: "Save your work to your account and download a clean PDF when it’s ready to send.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="px-5 py-20 md:px-8 md:py-28"
    >
      <Title
        eyebrow="A simple process"
        title="Three steps. One less thing to worry about."
        description="No design experience needed. Just bring your experience and we’ll help you present it well."
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((step, index) => (
          <article
            key={step.number}
            className="relative border-t border-slate-200 pt-6"
          >
            {index < 2 && (
              <ArrowRight
                className="absolute right-0 top-6 hidden text-slate-300 md:block"
                size={18}
              />
            )}

            <p className="text-xs font-semibold tracking-[0.18em] text-[#779d43]">
              {step.number}
            </p>

            <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
              {step.title}
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
              {step.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
