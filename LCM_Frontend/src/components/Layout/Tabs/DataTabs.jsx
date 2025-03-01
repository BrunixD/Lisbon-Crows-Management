// components/Layout/DataTabs.jsx
import React, { useState } from 'react';
import InsertMode from '../InsertMode';
import ViewMode from '../ViewMode';
import './../../Styles/Mode.css';

const DataTabs = () => {
  const [activeMode, setActiveMode] = useState('insert'); // 'insert' or 'view'

  return (
    <div>
      <div className="mode-tabs-container">
        <div className="mode-tabs">
          <button
            className={`mode-tab ${activeMode === 'insert' ? 'active' : ''}`}
            onClick={() => setActiveMode('insert')}
          >
            Insert
          </button>
          <button
            className={`mode-tab ${activeMode === 'view' ? 'active' : ''}`}
            onClick={() => setActiveMode('view')}
          >
            View
          </button>
        </div>
      </div>

      {activeMode === 'insert' ? <InsertMode /> : <ViewMode />}
    </div>
  );
};

export default DataTabs;