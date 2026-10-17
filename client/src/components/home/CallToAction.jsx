
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const CallToAction = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section id="contact" className="px-5 pb-20 md:px-8 md:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-[#17231b] px-6 py-12 text-center sm:px-12 sm:py-16 md:rounded-[32px] md:px-20 md:py-20">
        <div className="pointer-events-none absolute -right-20 -top-32 size-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -top-20 size-56 rounded-full border border-white/10" />

        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9f36a]">
          Your next opportunity is out there
        </p>

        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl md:text-5xl">
          Make your first impression a good one.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-300">
          Build a resume that feels clear, considered, and unmistakably yours.
        </p>

        <Link
          to={isAuthenticated ? "/app" : "/login"}
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#d5f59a] px-6 text-sm font-semibold text-[#17231b] transition hover:-translate-y-0.5 hover:bg-[#e1ffad]"
        >
          {isAuthenticated ? "Go to dashboard" : "Build your resume"}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
