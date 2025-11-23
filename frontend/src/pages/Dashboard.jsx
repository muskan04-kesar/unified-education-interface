import React from 'react';
import Card from '../components/Card';

export default function Dashboard() {
  return (
    <div className='page'>

      {/* Header Section */}
      <div className='header'>
        <div>
          <div className='title'>Dashboard</div>
          <div className='subtitle'>
            Unified view — Students · Teachers · Institutions · Govt
          </div>
        </div>

        <div>
          <button className='btn'>Create Report</button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className='grid'>
        <Card
          title='Student Profile'
          desc='View student details and performance'
          link='/student'
          pill='Students'
        />

        <Card
          title='Teacher Tools'
          desc='Manage classes & attendance'
          link='/teacher'
          pill='Teachers'
        />

        <Card
          title='Analytics'
          desc='AI insights and charts'
          link='/analytics'
          pill='Insights'
        />

        <Card
          title='Leaderboard'
          desc='Top performing students'
          link='/leaderboard'
          pill='Gamify'
        />

        <Card
          title='Institution Reports'
          desc='NIRF & AISHE reports'
          link='/institution'
          pill='Institution'
        />

        <Card
          title='Government Panel'
          desc='Scheme monitoring'
          link='/government'
          pill='Govt'
        />
      </div>
    </div>
  );
}
