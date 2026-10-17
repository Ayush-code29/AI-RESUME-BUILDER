
import React from "react";

const Title = ({ eyebrow, title, description }) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6e923b]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#17231b] sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default Title;
