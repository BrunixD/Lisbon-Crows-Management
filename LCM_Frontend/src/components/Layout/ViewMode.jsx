import React, { useState, useEffect } from 'react';
import Tab from './Tabs/Tab';
import Table from './Tables/Table';
import useData from '../hooks/useData';
import ViewModePaymentTabs from './Tabs/ViewModePaymentTabs.jsx';

const ViewMode = () => {
  const [activeTab, setActiveTab] = useState('Atletas');
  const [isMonthlyPaymentTab, setIsMonthlyPaymentTab] = useState(false);
  const { data, loading, error, fetchData } = useData(activeTab);

  useEffect(() => {
    fetchData(activeTab);
    setIsMonthlyPaymentTab(activeTab === 'Mensalidade'); // Check if the actual tab name matches
  }, [activeTab, fetchData]);

  return (
    <div className="view-mode">
      <div className="tab-container">
        <Tab label="Athletes" isActive={activeTab === 'Atletas'} onClick={() => setActiveTab('Atletas')} />
        <Tab label="Monthly Payments" isActive={activeTab === 'Mensalidade'} onClick={() => setActiveTab('Mensalidade')} />
        <Tab label="Merchandise" isActive={activeTab === 'merchandise'} onClick={() => setActiveTab('merchandise')} />
        <Tab label="Profit" isActive={activeTab === 'profit'} onClick={() => setActiveTab('profit')} />
      </div>
      <div className="content-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && isMonthlyPaymentTab ? (
          <ViewModePaymentTabs />
        ) : (
          !loading && !error && data && <Table data={data} tableName={activeTab} />
        )}
      </div>
    </div>
  );
};

export default ViewMode;