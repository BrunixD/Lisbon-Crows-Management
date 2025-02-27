// components/Layout/InsertMode.jsx
import React from 'react';
import InsertModeTabs from './InsertModeTabs'; // Import the new component

const InsertMode = () => {
  return (
    <div className="insert-mode">
      <InsertModeTabs /> {/* Render the InsertModeTabs component */}
    </div>
  );
};

export default InsertMode;