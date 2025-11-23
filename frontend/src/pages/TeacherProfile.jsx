import React from 'react';

export default function TeacherProfile() {
  const t = {
    name: 'Anita Sharma',
    empId: 'APAR-564738',
    dept: 'Computer Science',
    classes: ['B.Tech CSE', 'BCA']
  };

  return (
    <div className='page'>
      <h2>Teacher Profile</h2>

      <div className='card'>
        <div style={{ fontWeight: 700 }}>{t.name}</div>

        <div className='info-box' style={{ marginTop: 8 }}>
          <div>
            <b>APAR ID:</b> {t.empId}
          </div>
          <div>
            <b>Department:</b> {t.dept}
          </div>
          <div>
            <b>Classes:</b> {t.classes.join(', ')}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <a className='small' href='/teacher/edit-students'>
          Manage Student Records
        </a>
      </div>
    </div>
  );
}
