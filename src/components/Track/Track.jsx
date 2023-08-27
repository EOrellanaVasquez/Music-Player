import React from 'react';
import './Track.css';

const Track = ({ name, clicked, isActive }) => {
  return (
    <div className={`track ${isActive ? 'active' : ''}`} onClick={clicked}>
      {name}
    </div>
  );
};

export default Track;