import React from 'react';
import BadgeCard from '../components/BadgeCard';

export default function StudentProfile() {
  const data = {
    name: 'Kunal Singh',
    aadhar: 'XXXX-XXXX-1234',
    skills: ['AI', 'ML'],
    badges: ['Top Performer', 'Attendance Star']
  };

  return (
    <div className='page'>
      <h2>Student Profile</h2>

      <div
        className='card'
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center'
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 12,
            background: 'linear-gradient(90deg,#0ea5e9,#60a5fa)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            color: '#fff'
          }}
        >
          {data.name.split(' ').map(n => n[0]).join('')}
        </div>

        {/* Info Section */}
        <div>
          <div style={{ fontWeight: 700 }}>{data.name}</div>

          <div className='info-box' style={{ marginTop: 8 }}>
            <div>
              <b>Aadhar:</b> {data.aadhar}
            </div>
            <div>
              <b>Skills:</b> {data.skills.join(', ')}
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <h3 style={{ marginTop: 14 }}>Badges</h3>

      <div style={{ marginTop: 8 }}>
        {data.badges.map(b => (
          <BadgeCard key={b} title={b} />
        ))}
      </div>
    </div>
  );
}
