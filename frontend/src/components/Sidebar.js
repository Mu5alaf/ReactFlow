import React from 'react';
import '../App.css';

const Sidebar = () => {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('application/reactflow', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar">
      <div className='logo'>
        <img src={require('../image/cloudilic.png')} alt="Logo" width="100" height="100" />
      </div>
      <hr></hr>
      <div className="node" draggable onDragStart={(e) => handleDragStart(e, 'webscrapper')}>
        <img src={require('../image/web.png')} alt="Logo" width="30" height="30" />WebScrapper
      </div>
      <div className="node" draggable onDragStart={(e) => handleDragStart(e, 'summary')}>
        <img src={require('../image/profile.png')} alt="Logo" width="30" height="30" />Summary
      </div>
    </div>
  );
};

export default Sidebar;
