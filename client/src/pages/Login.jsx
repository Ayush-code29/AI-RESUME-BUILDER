
import { Lock, Mail, User2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const query = new URLSearchParams(location.search);
  const initialState = query.get("state");

  const [state, setState] = useState(
    initialState === "register" ? "register" : "login"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (state === "register" && formData.name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      if (state === "register") {
        await register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });
      } else {
        await login({
          email: formData.email.trim(),
          password: formData.password,
        });
      }

      const redirect = query.get("redirect");
      const safeRedirect =
        redirect?.startsWith("/") && !redirect.startsWith("//")
          ? redirect
          : "/app";

      navigate(safeRedirect, { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const toggleState = () => {
    setState((previous) =>
      previous === "login" ? "register" : "login"
    );

    setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-gray-300/60 bg-white px-8 text-center sm:w-[350px]"
      >
        <Link
          to="/"
          className="mt-8 inline-block text-sm text-gray-500 hover:text-indigo-500"
        >
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-medium text-gray-900">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Please {state === "login" ? "login" : "register"} to continue
        </p>

        {state !== "login" && (
          <div className="mt-6 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/80 bg-white pl-6">
            <User2Icon size={16} color="#687280" />

            <input
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="name"
              className="w-full border-none outline-none ring-0"
              value={formData.name}
              onChange={handleChange}
              minLength={2}
              maxLength={80}
              required
            />
          </div>
        )}

        <div className="mt-4 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/80 bg-white pl-6">
          <Mail size={15} color="#687280" />

          <input
            type="email"
            name="email"
            placeholder="Email id"
            autoComplete="email"
            className="w-full border-none outline-none ring-0"
            value={formData.email}
            onChange={handleChange}
            maxLength={254}
            required
          />
        </div>

        <div className="mt-4 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/80 bg-white pl-6">
          <Lock size={15} color="#687280" />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete={
              state === "login" ? "current-password" : "new-password"
            }
            className="w-full border-none outline-none ring-0"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            maxLength={72}
            required
          />
        </div>

        {state === "login" && (
          <div className="mt-4 text-left text-indigo-500">
            <button
              type="button"
              onClick={() =>
                setError(
                  "Password reset is not available yet. Please contact the application administrator."
                )
              }
              className="text-sm hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-left text-sm text-red-600"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 h-11 w-full rounded-full bg-indigo-500 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : state === "login"
              ? "Login"
              : "Create account"}
        </button>

        <p className="mb-10 mt-5 text-sm text-gray-500">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleState}
            className="text-indigo-500 hover:underline"
          >
            {state === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
