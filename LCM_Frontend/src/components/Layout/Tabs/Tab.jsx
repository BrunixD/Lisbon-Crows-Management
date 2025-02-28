// Tab.js
import React from 'react';
import '../../Styles/TabTable.css'; // Might not need its own CSS, could inherit from DataTabs or ViewMode

const Tab = ({ label, isActive, onClick }) => {
  return (
    <button className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Tab;