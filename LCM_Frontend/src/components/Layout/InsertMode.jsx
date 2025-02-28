// components/Layout/InsertMode.jsx
import React from 'react';
import InsertModeTabs from './Tabs/InsertModeTabs'; // Import the new component
import './../Styles/Mode.css';

const InsertMode = () => {
  return (
    <div className="insert-mode">
      <InsertModeTabs /> {/* Render the InsertModeTabs component */}
    </div>
  );
};

export default InsertMode;