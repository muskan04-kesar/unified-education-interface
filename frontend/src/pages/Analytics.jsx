import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Analytics() {
  const data = [
    { month: 'Jan', score: 67 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 81 },
    { month: 'Apr', score: 85 }
  ];

  return (
    <div className='page'>
      <h2>Analytics</h2>

      <div className='card'>
        <LineChart width={700} height={300} data={data}>
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray='3 3' />
          <Line
            type='monotone'
            dataKey='score'
            stroke='#0ea5e9'
          />
        </LineChart>
      </div>
    </div>
  );
}
