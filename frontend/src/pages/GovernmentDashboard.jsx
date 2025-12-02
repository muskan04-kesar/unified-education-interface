import React, { useState } from "react";
import { ROLES } from "../roles";
import { getRole } from "../auth";

export default function GovernmentDashboard({ schemes, setSchemes }) {
  const role = getRole();

  // Add new scheme inputs
  const [form, setForm] = useState({ name: "", desc: "", link: "" });

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ id: null, name: "", desc: "", link: "" });

  // ---------------------- ADD SCHEME ----------------------
  function addScheme() {
    if (!form.name || !form.desc || !form.link)
      return alert("Please fill all fields");

    const newScheme = {
      id: Date.now(),
      name: form.name,
      desc: form.desc,
      link: form.link,
    };

    setSchemes([...schemes, newScheme]);
    setForm({ name: "", desc: "", link: "" });
  }

  // ---------------------- DELETE SCHEME ----------------------
  function deleteScheme(id) {
    if (!window.confirm("Are you sure you want to delete this scheme?")) return;
    setSchemes(schemes.filter((s) => s.id !== id));
  }

  // ---------------------- START EDIT ----------------------
  function startEdit(scheme) {
    setEditMode(true);
    setEditData(scheme);
  }

  // ---------------------- SAVE EDIT ----------------------
  function saveEdit() {
    setSchemes(
      schemes.map((s) =>
        s.id === editData.id ? editData : s
      )
    );
    setEditMode(false);
  }

  return (
    <div className="page">
      <h2>Government Dashboard</h2>

      {/* MAIN CARD */}
      <div className="card">

        {/* ================= ADD NEW SCHEME ================= */}
        <h3>Manage Government Schemes</h3>

        <div className="info-box" style={{ marginBottom: 25 }}>
          <h4>Add New Scheme</h4>

          <input
            className="input"
            placeholder="Scheme Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ marginBottom: 10 }}
          />

          <input
            className="input"
            placeholder="Description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            style={{ marginBottom: 10 }}
          />

          <input
            className="input"
            placeholder="Official Link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            style={{ marginBottom: 10 }}
          />

          <button className="btn" onClick={addScheme}>➕ Add Scheme</button>
        </div>

        {/* ================= LIST SCHEMES ================= */}
        <h3>Existing Schemes</h3>

        {schemes.length === 0 && <p>No schemes added yet.</p>}

        {schemes.map((s) => (
          <div key={s.id} className="leaderboard-row" style={{ padding: 15 }}>
            <div>
              <b style={{ fontSize: "16px" }}>{s.name}</b>
              <p style={{ margin: "6px 0" }}>{s.desc}</p>
              <a
                href={s.link}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#2563eb", fontWeight: "600" }}
              >
                View Scheme →
              </a>
            </div>

            {/* GOV ACCESS ONLY */}
            {role === ROLES.GOVERNMENT && (
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn"
                  style={{ background: "#4ade80", padding: "6px 10px" }}
                  onClick={() => startEdit(s)}
                >
                  ✏ Edit
                </button>

                <button
                  className="btn"
                  style={{ background: "#ef4444", padding: "6px 10px" }}
                  onClick={() => deleteScheme(s.id)}
                >
                  🗑 Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editMode && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="card"
            style={{ width: 400, padding: 20, background: "white" }}
          >
            <h3>Edit Scheme</h3>

            <input
              className="input"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              style={{ marginBottom: 10 }}
            />

            <input
              className="input"
              value={editData.desc}
              onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
              style={{ marginBottom: 10 }}
            />

            <input
              className="input"
              value={editData.link}
              onChange={(e) => setEditData({ ...editData, link: e.target.value })}
              style={{ marginBottom: 10 }}
            />

            <button className="btn" onClick={saveEdit}>💾 Save</button>
            <button
              className="btn"
              style={{ background: "gray", marginLeft: 10 }}
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
