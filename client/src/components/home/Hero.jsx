import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const perks = ["Free to use", "No design skills needed", "PDF download"];

/* A small static preview of the product: editor on the left, resume on the right. */
const ProductPreview = () => (
  <div className="mx-auto mt-16 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white/80 p-2 shadow-2xl shadow-green-900/10 backdrop-blur sm:p-3">
    <div className="mb-2 flex items-center gap-1.5 px-2 pt-1">
      <span className="size-2.5 rounded-full bg-red-300" />
      <span className="size-2.5 rounded-full bg-yellow-300" />
      <span className="size-2.5 rounded-full bg-green-300" />
    </div>

    <div className="grid gap-3 rounded-xl bg-slate-50 p-3 text-left sm:p-4 md:grid-cols-2">
      {/* Editor side */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-md bg-slate-900 px-2.5 py-1.5 text-white">
            1. Personal
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-slate-500">
            2. Summary
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-slate-500">
            3. Experience
          </span>
        </div>

        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/3 rounded-full bg-green-500" />
        </div>

        {[
          ["Full name", "Alex Morgan"],
          ["Job title", "Full Stack Developer"],
          ["Email", "alex.morgan@example.com"],
        ].map(([label, value]) => (
          <div key={label} className="mb-3">
            <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
            <div className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Resume side */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-center text-xl font-bold text-green-600">
          ALEX MORGAN
        </h3>
        <p className="mt-1 text-center text-xs text-slate-500">
          Full Stack Developer · alex.morgan@example.com
        </p>
        <div className="my-3 h-px bg-green-500" />

        <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600">
          Summary
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-full rounded bg-slate-200" />
          <div className="h-1.5 w-11/12 rounded bg-slate-200" />
          <div className="h-1.5 w-8/12 rounded bg-slate-200" />
        </div>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-green-600">
          Experience
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-2 w-1/2 rounded bg-slate-300" />
          <div className="h-1.5 w-full rounded bg-slate-200" />
          <div className="h-1.5 w-10/12 rounded bg-slate-200" />
        </div>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-green-600">
          Skills
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["React", "Node.js", "MongoDB", "Tailwind"].map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative isolate overflow-hidden px-5 pb-20 pt-16 text-center md:px-8 md:pt-24">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[48rem] max-w-full -translate-x-1/2 rounded-full bg-green-300 opacity-30 blur-[120px]" />

      <div className="mx-auto max-w-4xl">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 ring-1 ring-green-100">
          <span className="size-2 rounded-full bg-green-500" />
          Free online resume builder
        </p>

        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-6xl md:leading-[1.1]">
          Build a resume that gets you{" "}
          <span className="bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
            noticed
          </span>
          .
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Fill in your details, pick a clean template and watch your resume
          update live. Save it to your account and download it as a PDF when
          you are ready to apply.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={isAuthenticated ? "/app" : "/login"}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-green-500 px-8 font-semibold text-white shadow-lg shadow-green-500/25 transition hover:bg-green-600"
          >
            {isAuthenticated ? "Go to dashboard" : "Create my resume"}
            <ArrowRight size={18} />
          </Link>

          <a
            href="#features"
            className="inline-flex h-12 items-center rounded-full border border-slate-300 px-8 font-medium text-slate-700 transition hover:border-green-500 hover:bg-green-50 hover:text-green-700"
          >
            See how it works
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
          {perks.map((perk) => (
            <li key={perk} className="inline-flex items-center gap-1.5">
              <Check size={16} className="text-green-600" />
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
