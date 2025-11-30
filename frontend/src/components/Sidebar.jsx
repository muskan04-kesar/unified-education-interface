import React from 'react';
import { NavLink } from 'react-router-dom';
import { getRole } from '../auth';
export default function Sidebar(){
  const role = getRole();
  const items = [
    {to:'/dashboard',label:'Dashboard',roles:['student','teacher','institution','government']},
    {to:'/student',label:'Student Profile',roles:['student']},
    {to:'/schemes',label:'Govt Schemes',roles:['student','teacher','institution','government']},
    {to:'/teacher',label:'Teacher Profile',roles:['teacher']},
    {to:'/teacher/edit-students',label:'Edit Students',roles:['teacher']},
    {to:'/analytics',label:'Analytics',roles:['teacher','institution','government']},
    {to:'/leaderboard',label:'Leaderboard',roles:['student','teacher','institution','government']},
    {to:'/institution',label:'Institution',roles:['institution']},
    {to:'/government',label:'Government',roles:['government']},
  ];
  return (
    <aside className='sidebar'>
      <div className='brand'>
        <div className='logo'>UE</div>
        <div>
          <div className='title'>Unified Education</div>
          <div className='small'>Admin Console</div>
        </div>
      </div>
      <nav className='nav'>
        {items.filter(i=> i.roles.includes(role)).map(i=>(
          <NavLink key={i.to} to={i.to} className={({isActive})=> isActive? 'active':''}>{i.label}</NavLink>
        ))}
      </nav>
      <div style={{flex:1}} />
      <div className='small'>Built for SIH</div>
    </aside>
  )
}