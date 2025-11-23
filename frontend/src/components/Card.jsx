import React from 'react';
import { Link } from 'react-router-dom';
export default function Card({title,desc,link,pill}){return (<Link to={link||'#'} className='card' style={{display:'block'}}><div style={{display:'flex',justifyContent:'space-between'}}><h3>{title}</h3>{pill && <div className='accent-pill'>{pill}</div>}</div><p>{desc}</p></Link>)}