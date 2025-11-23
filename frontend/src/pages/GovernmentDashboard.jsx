import React from 'react';

export default function GovernmentDashboard() {
  const d = {
    ministry: 'Ministry of Education',
    inst: 5480,
    students: '3.8M',
    schemes: ['AISHE', 'NIRF', 'PM Scholarship']
  };

  return (
    <div className='page'>
      <h2>Government Dashboard</h2>

      <div className='card'>
        <div style={{ fontWeight: 700 }}>{d.ministry}</div>

        <div className='info-box' style={{ marginTop: 8 }}>
          <div>
            <b>Institutions:</b> {d.inst}
          </div>
          <div>
            <b>Total Students:</b> {d.students}
          </div>
          <div>
            <b>Schemes:</b> {d.schemes.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
}
