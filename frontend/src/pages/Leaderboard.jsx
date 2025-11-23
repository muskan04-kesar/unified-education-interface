import React from 'react';

export default function Leaderboard() {
  const data = [
    { name: 'Nimisha Sharma', points: 1290 },
    { name: 'Kunal Singh', points: 1250 },
    { name: 'Lokendra dubey', points: 1240 },
    { name: 'Nandini Gupta', points: 1235 },
    { name: 'Muskan kesarwani', points: 1231 },
    { name: 'Raj Pathak', points: 1228 }
  ];

  return (
    <div className='page'>
      <h2>Leaderboard</h2>

      <div className='card'>
        {data.map((d, i) => (
          <div key={d.name} className='leaderboard-row'>
            <div style={{ fontWeight: 700 }}>
              {i + 1}. {d.name}
            </div>
            <div style={{ fontWeight: 700 }}>{d.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
