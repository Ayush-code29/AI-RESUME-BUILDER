
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleGetStarted = () => {
    navigate(isAuthenticated ? "/app" : "/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">

        {/* Original Logo — Preserved */}
        <Link
          to="/"
          aria-label="Resume Builder Home"
          className="group shrink-0 text-[27px] font-bold tracking-[-1.5px] text-slate-950 transition-opacity hover:opacity-80"
        >
          resume<span className="text-green-500">.</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-green-600"
          >
            Home
          </Link>

          <a
            href="/#features"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-green-600"
          >
            Features
          </a>

          <a
            href="/#testimonials"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-green-600"
          >
            Testimonials
          </a>

          <a
            href="/#contact"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-green-600"
          >
            Contact
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {!isAuthenticated && (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="hidden rounded-full px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 sm:inline-flex"
            >
              Log in
            </button>
          )}

          <button
            type="button"
            onClick={handleGetStarted}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-md hover:shadow-green-500/20 active:translate-y-0 sm:px-5"
          >
            <span>
              {isAuthenticated ? "Dashboard" : "Get started"}
            </span>

            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 lg:inline-flex"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
