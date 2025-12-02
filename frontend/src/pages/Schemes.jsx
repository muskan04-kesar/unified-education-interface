import React from "react";

export default function Schemes({ schemes }) {
  return (
    <div className="page">
      <h2>Government Schemes</h2>

      <div className="card">
        {schemes.map((s) => (
          <div key={s.id} style={{ marginBottom: "20px" }}>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>

            <a href={s.link} target="_blank" rel="noreferrer" className="btn">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
