
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  FileText,
  Download,
  Eye,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const perks = [
  "Free to use",
  "Live preview",
  "PDF when you're ready",
];

const ProductPreview = () => (
  <div className="relative mx-auto mt-16 max-w-5xl px-1 sm:mt-20 sm:px-4">
    <div className="absolute -inset-x-8 top-10 -z-10 h-48 rounded-[100%] bg-[#dff3b6]/70 blur-3xl" />

    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_28px_90px_-38px_rgba(18,35,23,0.28)] sm:rounded-[28px] sm:p-3">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 pb-3 pt-1 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#d7d9d4]" />
          <span className="size-2.5 rounded-full bg-[#d7d9d4]" />
          <span className="size-2.5 rounded-full bg-[#d7d9d4]" />
        </div>

        <span className="text-[11px] font-medium tracking-wide text-slate-400">
          YOUR RESUME WORKSPACE
        </span>

        <span className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
          <span className="size-1.5 rounded-full bg-[#83b93a]" />
          Live preview
        </span>
      </div>

      <div className="grid gap-3 bg-[#f7f8f5] p-2 sm:gap-4 sm:p-4 md:grid-cols-[0.86fr_1.14fr]">
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 sm:p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Personal details
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Let's start with the basics
              </p>
            </div>

            <span className="rounded-lg bg-[#f0f7e6] p-2 text-[#5f8727]">
              <FileText size={17} />
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {["Personal", "Summary", "Experience"].map((item, index) => (
              <span
                key={item}
                className={`rounded-md px-2 py-1.5 text-[10px] font-medium sm:text-xs ${
                  index === 0
                    ? "bg-[#17231b] text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          {[
            ["FULL NAME", "Alex Morgan"],
            ["PROFESSIONAL TITLE", "Product Designer"],
            ["EMAIL ADDRESS", "alex.morgan@email.com"],
          ].map(([label, value]) => (
            <div key={label} className="mb-3.5">
              <p className="mb-1.5 text-[9px] font-semibold tracking-[.13em] text-slate-400">
                {label}
              </p>

              <div className="rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-700 sm:text-sm">
                {value}
              </div>
            </div>
          ))}

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs text-slate-400">Step 1 of 6</span>

            <span className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
              <span className="block h-full w-1/3 rounded-full bg-[#9ac94d]" />
            </span>
          </div>
        </div>

        <div className="flex justify-center rounded-xl bg-[#e9ece5] p-3 sm:p-5">
          <div className="w-full max-w-[360px] bg-white px-5 py-6 shadow-[0_5px_24px_rgba(20,30,20,.08)] sm:px-7 sm:py-8">
            <div className="border-b-2 border-[#9ac94d] pb-4">
              <p className="text-xl font-bold tracking-[.12em] text-slate-900 sm:text-2xl">
                ALEX MORGAN
              </p>

              <p className="mt-1.5 text-[10px] text-slate-500 sm:text-xs">
                Product Designer · alex.morgan@email.com
              </p>
            </div>

            <div className="mt-5">
              <p className="text-[9px] font-bold tracking-[.17em] text-[#638c2d]">
                PROFILE
              </p>

              <div className="mt-2 space-y-1.5">
                <div className="h-1.5 w-full rounded bg-slate-200" />
                <div className="h-1.5 w-[94%] rounded bg-slate-200" />
                <div className="h-1.5 w-[73%] rounded bg-slate-200" />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-[9px] font-bold tracking-[.17em] text-[#638c2d]">
                EXPERIENCE
              </p>

              <p className="mt-2 text-[11px] font-semibold text-slate-800">
                Senior Product Designer
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                Company name · 2022 — Present
              </p>

              <div className="mt-2 space-y-1.5">
                <div className="h-1.5 w-full rounded bg-slate-200" />
                <div className="h-1.5 w-[90%] rounded bg-slate-200" />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-[9px] font-bold tracking-[.17em] text-[#638c2d]">
                CORE SKILLS
              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Product design", "Figma", "Prototyping"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded border border-slate-200 px-2 py-1 text-[8px] text-slate-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Eye size={15} className="text-[#709b37]" />
          What you see is what you download.
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
          <Download size={14} />
          PDF-ready layout
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative isolate overflow-hidden px-5 pb-20 pt-16 sm:pt-20 md:px-8 md:pb-24 md:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(ellipse_at_top,_rgba(201,243,106,0.19),_transparent_65%)]" />

      <div className="mx-auto max-w-4xl text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.13em] text-slate-600 shadow-sm">
          <Sparkles size={13} className="text-[#6d9632]" />
          Your next chapter starts here
        </p>

        <h1 className="mt-7 text-[2.7rem] font-semibold leading-[1.04] tracking-[-.065em] text-[#152019] sm:text-6xl md:text-[76px]">
          A resume that feels
          <br className="hidden sm:block" />{" "}
          <span className="relative inline-block">
            like you
            <span className="absolute -bottom-1 left-0 -z-10 h-3 w-full rounded-full bg-[#d9f5a5] sm:h-4" />
          </span>
          . Only sharper.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          Thoughtfully designed resumes, without the formatting headache.
          Tell your story, make it yours, and leave with a polished PDF
          that’s ready for the next opportunity.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={isAuthenticated ? "/app" : "/login"}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#17231b] px-7 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#2b3c2f]"
          >
            {isAuthenticated ? "Open my dashboard" : "Create your resume"}
            <ArrowRight size={16} />
          </Link>

          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            See how it works
          </a>
        </div>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500 sm:gap-x-7 sm:text-sm">
          {perks.map((perk) => (
            <li key={perk} className="inline-flex items-center gap-1.5">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#eef7df] text-[#5f8727]">
                <Check size={10} />
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </div>

      <ProductPreview />
    </section>
  );
};

export default Hero;
