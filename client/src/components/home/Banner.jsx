
import React from "react";
import { ArrowUpRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="bg-[#17231b] px-4 py-2.5 text-center text-xs text-white sm:text-sm">
      <p className="flex flex-wrap items-center justify-center gap-1.5">
        A better way to present your experience.
        <a
          href="#features"
          className="inline-flex items-center gap-1 font-semibold text-[#d5f59a] transition hover:text-white"
        >
          Explore Folio
          <ArrowUpRight size={13} />
        </a>
      </p>
    </div>
  );
};

export default Banner;
