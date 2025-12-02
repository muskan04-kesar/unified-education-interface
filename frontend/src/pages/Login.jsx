import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAs } from "../auth";

export default function Login() {
  const [role, setRole] = useState("student");

  // Input fields (dynamic)
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [otp, setOtp] = useState("");

  const nav = useNavigate();

  // -------- FIELD LABELS BASED ON ROLE ----------
  const labels = {
    student: {
      f1: "Aadhaar Number",
      f2: "Mobile Number",
      f3: "OTP",
    },
    teacher: {
      f1: "APAR ID",
      f2: "Mobile Number",
      f3: "OTP",
    },
    institution: {
      f1: "AISHE ID",
      f2: "Official Email ID",
      f3: "OTP",
    },
    government: {
      f1: "NIC ID",
      f2: "NIC Email",
      f3: "Select Role",
    },
  };

  // ------------- LOGIN FUNCTION -------------
  function doLogin() {
    if (!field1 || !field2 || (!otp && role !== "government"))
      return alert("Please fill all fields!");

    loginAs(role);

    if (role === "student") nav("/student");
    else if (role === "teacher") nav("/teacher");
    else if (role === "institution") nav("/institution");
    else nav("/government");
  }

  return (
    <div className="login-wrap">

      {/* BACKGROUND ANIMATION */}
      <div className="bg-anim" aria-hidden>
        <span className="s1"></span>
        <span className="s2"></span>
      </div>

      <div className="login-card">
        {/* LOGO */}
        <img
          src="/assets/logo.png"
          alt="logo"
          style={{
            width: 90,
            height: 90,
            margin: "0 auto 12px",
            display: "block",
          }}
        />

        <h2 style={{ textAlign: "center" }}>Unified Education Login</h2>

        {/* ------------- ROLE SELECTION BUTTONS ------------- */}
        <label className="small">Select Login Type</label>
        <div className="role-buttons" style={{ marginTop: 8, marginBottom: 16 }}>
          {["student", "teacher", "institution", "government"].map((r) => (
            <button
              key={r}
              className={r === role ? "role-btn active" : "role-btn"}
              onClick={() => {
                setRole(r);
                setField1("");
                setField2("");
                setOtp("");
              }}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* -------- DYNAMIC FORM FIELDS BASED ON ROLE ---------- */}
        <label className="small">{labels[role].f1}</label>
        <input
          className="input"
          value={field1}
          onChange={(e) => setField1(e.target.value)}
          placeholder={labels[role].f1}
          style={{ marginTop: 6, marginBottom: 12 }}
        />

        <label className="small">{labels[role].f2}</label>
        <input
          className="input"
          value={field2}
          onChange={(e) => setField2(e.target.value)}
          placeholder={labels[role].f2}
          style={{ marginTop: 6, marginBottom: 12 }}
        />

        {/* FOR GOVERNMENT — FIELD 3 IS NOT OTP BUT DROPDOWN */}
        {role === "government" ? (
          <>
            <label className="small">Role</label>
            <select
              className="input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ marginTop: 6, marginBottom: 16 }}
            >
              <option value="">Select Role</option>
              <option value="Data Officer">Data Officer</option>
              <option value="Scheme Manager">Scheme Manager</option>
              <option value="State Admin">State Admin</option>
              <option value="Central Admin">Central Admin</option>
            </select>
          </>
        ) : (
          <>
            <label className="small">{labels[role].f3}</label>
            <input
              className="input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              style={{ marginTop: 6, marginBottom: 16 }}
            />
          </>
        )}

        {/* LOGIN BUTTON */}
        <button className="btn" style={{ width: "100%" }} onClick={doLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
