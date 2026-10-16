import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="flex h-10 items-center justify-center gap-3 bg-gradient-to-r from-lime-300 via-green-100 to-white px-4">
        <span className="rounded-full bg-green-600 px-4 py-1 text-sm font-semibold text-white">
          New
        </span>

        <span className="text-sm font-medium text-gray-900">
          AI Website Builder
        </span>
      </div>

      {/* Main Navbar */}
      <header className="relative z-50 w-full bg-white/90">
        <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 text-3xl font-bold tracking-tight text-slate-950"
          >
            resume<span className="text-green-500">.</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-9 md:flex">
            <Link
              to="/"
              className="text-base text-slate-800 transition hover:text-green-600"
            >
              Home
            </Link>

            <a
              href="/#features"
              className="text-base text-slate-800 transition hover:text-green-600"
            >
              Features
            </a>

            <a
              href="/#testimonials"
              className="text-base text-slate-800 transition hover:text-green-600"
            >
              Testimonials
            </a>

            <a
              href="/#contact"
              className="text-base text-slate-800 transition hover:text-green-600"
            >
              Contact
            </a>
          </div>

          {/* Authentication Buttons */}
          <div className="flex shrink-0 items-center gap-3">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-500 px-7 py-3 text-sm font-medium text-slate-800 transition hover:border-red-500 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-full border border-slate-500 px-7 py-3 text-sm font-medium text-slate-800 transition hover:border-green-500 hover:bg-green-50 hover:text-green-700"
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;