import React from "react";

export default function Splash() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#e6f2ff,#f3f9ff)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Logo: PPT cannot be shown, so this hides automatically */}
        <img
          src="/assets/logo.png"
          alt="Ministry of Education Logo"
          style={{
            width: 130,
            height: 130,
            display: "block",
            
            margin: "0 auto 12px",
          }}
        />

        <h1 style={{ fontSize: 28, color: "#0f1724" }}>
          Unified Education Interface
        </h1>
      </div>
    </div>
  );
}
