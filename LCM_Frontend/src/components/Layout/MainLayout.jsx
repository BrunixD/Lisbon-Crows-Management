// components/Layout/MainLayout.jsx
import React, { useState } from 'react';
import DataTabs from './Tabs/DataTabs';
import './../Styles/Layout.css';
import './../Styles/StickyHeader.css';
import './../Styles/Sidebar.css';
// Import other layout-related CSS if needed

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-layout">
      <header className="sticky-header">
        <nav>
          {/*  Navigation Tabs */}

          {/* Hamburger Menu Icon */}
          <button className="hamburger-menu" onClick={toggleSidebar}>☰</button>
        </nav>
      </header>

      <main className="content">
        <DataTabs />
      </main>
    </div>
  );
};

export default MainLayout;