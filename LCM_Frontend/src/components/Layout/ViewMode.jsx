// components/Layout/ViewMode.jsx
import React, { useState, useEffect } from 'react';
import Tab from './Tabs/Tab';
import Table from './Tables/Table'; // Adjust path if necessary
import useData from './../hooks/useData';
import ViewModePaymentTabs from './Tabs/ViewModePaymentTabs.jsx';
import ViewModeMerchandiseTabs from './Tabs/ViewModeMerchandiseTabs'; // Import the new component

const ViewMode = () => {
  const [activeTab, setActiveTab] = useState('Atletas');
  const [isMonthlyPaymentTab, setIsMonthlyPaymentTab] = useState(false);
  const [isMerchandiseTab, setIsMerchandiseTab] = useState(false); // New state

  const { data, loading, error, fetchData } = useData(activeTab);

  useEffect(() => {
    fetchData(activeTab);
    setIsMonthlyPaymentTab(activeTab === 'Mensalidade');
    setIsMerchandiseTab(activeTab === 'Merchandise'); // Update isMerchandiseTab

  }, [activeTab, fetchData]);


  return (
    <div className="view-mode">
      <div className="tab-container">
        <Tab label="Athletes" isActive={activeTab === 'Atletas'} onClick={() => setActiveTab('Atletas')} />
        <Tab label="Monthly Payments" isActive={activeTab === 'Mensalidade'} onClick={() => setActiveTab('Mensalidade')} />
        <Tab
          label="Merchandise"
          isActive={activeTab === 'Merchandise'}
          onClick={() => setActiveTab('Merchandise')}
        />
        <Tab label="Profit" isActive={activeTab === 'profit'} onClick={() => setActiveTab('profit')} />
      </div>

      <div className="content-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {/* Conditionally render based on active tab */}
        {!loading && !error && isMonthlyPaymentTab ? (
          <ViewModePaymentTabs />
        ) : !loading && !error && isMerchandiseTab ? (
          <ViewModeMerchandiseTabs />
        ) : (
          !loading && !error && data && <Table data={data} tableName={activeTab} />
        )}
      </div>
    </div>
  );
};

export default ViewMode;