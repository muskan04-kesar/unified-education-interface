import React from 'react';

export default function InstitutionDashboard() {
  const inst = {
    name: 'UNITED COLLEGE OF ENGINEERING AND RESEARCH',
    aishe: 'U-12345',
    students: 5250,
    teachers: 128,
    nirf: 56
  };

  return (
    <div className='page'>
      <h2>Institution Dashboard</h2>

      <div className='card'>
        <div style={{ fontWeight: 700 }}>{inst.name}</div>

        <div className='info-box' style={{ marginTop: 8 }}>
          <div>
            <b>AISHE:</b> {inst.aishe}
          </div>
          <div>
            <b>Students:</b> {inst.students}
          </div>
          <div>
            <b>Teachers:</b> {inst.teachers}
          </div>
          <div>
            <b>NIRF:</b> {inst.nirf}
          </div>
        </div>
      </div>
    </div>
  );
}
