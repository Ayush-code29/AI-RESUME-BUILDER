
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="builder/:resumeId"
            element={<ResumeBuilder />}
          />
        </Route>

        <Route path="/view/:resumeId" element={<Preview />} />
      </Route>

      <Route path="*" element={<div className="p-8">Page not found.</div>} />
    </Routes>
  );
}
