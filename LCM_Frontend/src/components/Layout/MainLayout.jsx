// components/Layout/MainLayout.jsx
import React, { useState } from 'react';
import DataTabs from './Tabs/DataTabs';

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
          {/* REMOVE THESE BUTTONS
          <button onClick={() => console.log("Insert clicked")}>Insert</button>
          <button onClick={() => console.log("View clicked")}>View</button> */}

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