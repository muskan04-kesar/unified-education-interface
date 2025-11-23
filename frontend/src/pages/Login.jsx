import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAs } from "../auth";

export default function Login() {
  const [role, setRole] = useState("student");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  function doLogin() {
    setLoading(true);
    setTimeout(() => {
      loginAs(role);
      setLoading(false);

      if (role === "student") nav("/student");
      else if (role === "teacher") nav("/teacher");
      else if (role === "institution") nav("/institution");
      else nav("/government");
    }, 800);
  }

  return (
    <div className="login-wrap">
      <div className="bg-anim" aria-hidden>
        <span className="s1"></span>
        <span className="s2"></span>
      </div>

      <div className="login-card">

        {/* ✅ LOGO placed here */}
        <img
          src="/assets/logo.png"
          alt="logo"
          style={{ width: 90, height: 90, margin: "0 auto 12px", display: "block" }}
        />

        <h2>Unified Education Login</h2>

        <label className="small">Aadhar / APAR / AISHE ID</label>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input"
          placeholder="Enter your ID"
          style={{ marginTop: 8, marginBottom: 12 }}
        />

        <label className="small">Select Role</label>
        <div className="role-buttons" style={{ marginTop: 8, marginBottom: 16 }}>
          {["student", "teacher", "institution", "government"].map((r) => (
            <button
              key={r}
              className={r === role ? "role-btn active" : "role-btn"}
              onClick={() => setRole(r)}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <button
          className="btn"
          style={{ width: "100%" }}
          onClick={doLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
