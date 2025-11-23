import React, { useState } from 'react';

export default function StudentTableEditor() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul', marks: 85, attendance: 92 },
    { id: 2, name: 'Riya', marks: 78, attendance: 88 }
  ]);

  const update = (i, field, value) => {
    const copy = [...students];
    copy[i][field] = value;
    setStudents(copy);
  };

  return (
    <div className='page'>
      <h2>Manage Students</h2>

      <table className='table' style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Marks</th>
            <th>Attendance</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{s.name}</td>

              <td>
                <input
                  className='input'
                  value={s.marks}
                  onChange={(e) => update(i, 'marks', Number(e.target.value))}
                />
              </td>

              <td>
                <input
                  className='input'
                  value={s.attendance}
                  onChange={(e) => update(i, 'attendance', Number(e.target.value))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className='btn'
        style={{ marginTop: 12 }}
        onClick={() => alert('Saved (mock)')}
      >
        Save
      </button>
    </div>
  );
}
