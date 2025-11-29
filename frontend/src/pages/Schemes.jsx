import React from "react";

export default function Schemes() {
  const schemes = [
    {
      name: "National Scholarship Scheme",
      desc: "Financial assistance for meritorious students.",
      link: "https://scholarships.gov.in/"
    },
    {
      name: "PM e-Vidya",
      desc: "Digital learning resources for all students.",
      link: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1628347"
    },
    {
      name: "SWAYAM",
      desc: "Free online courses by Ministry of Education.",
      link: "https://swayam.gov.in/"
    },
    {
      name: "AICTE Pragati Scholarship",
      desc: "Scholarship for girl students in technical education.",
      link: "https://www.aicte-india.org/schemes/students-development-schemes"
    }
  ];

  return (
    <div className="page">
      <h2>Government Schemes</h2>

      <div className="card">
        {schemes.map((s) => (
          <div key={s.name} style={{ marginBottom: "16px" }}>
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
