
import React from "react";
import { FileText, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#c9f36a] text-[#172016]">
            <FileText size={16} />
          </span>

          <span className="text-lg font-semibold tracking-tight text-slate-900">
            folio<span className="text-[#6e9e28]">.</span>
          </span>
        </Link>

        <p className="text-xs leading-5 text-slate-500">
          A little more confidence for whatever comes next.
        </p>

        <div className="flex items-center gap-5 text-xs text-slate-500">
          <a href="#features" className="transition hover:text-slate-900">
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition hover:text-slate-900"
          >
            How it works
          </a>

          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1 transition hover:text-slate-900"
          >
            Back to top
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl border-t border-slate-100 pt-5 text-[11px] text-slate-400">
        © {new Date().getFullYear()} Folio Resume Builder. Made to help your next chapter begin.
      </div>
    </footer>
  );
};

export default Footer;
