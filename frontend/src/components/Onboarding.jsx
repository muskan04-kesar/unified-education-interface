import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Onboarding(){
  const nav = useNavigate();
  return (
    <div style={{padding:40}}>
      <div style={{maxWidth:720,margin:'0 auto',textAlign:'center'}}>
        <h2>Welcome — Quick Setup</h2>
        <p style={{color:'#6b7280'}}>A short onboarding to set your role and preferences.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:20}}>
          <button className='btn' onClick={()=>nav('/dashboard')}>Skip</button>
        </div>
      </div>
    </div>
  )
}