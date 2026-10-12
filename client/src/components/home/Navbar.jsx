import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <header className="w-full bg-white">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" className="shrink-0 text-3xl font-bold tracking-tight text-slate-950">
          resume<span className="text-green-500">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-slate-800 transition hover:text-green-600">
            Home
          </Link>
          <a href="/#features" className="text-slate-800 transition hover:text-green-600">
            Features
          </a>
          <a href="/#testimonials" className="text-slate-800 transition hover:text-green-600">
            Testimonials
          </a>
          <a href="/#contact" className="text-slate-800 transition hover:text-green-600">
            Contact
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={handleGetStarted}
            className="rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
          >
            Get started
          </button>

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
  );
};

export default Navbar;