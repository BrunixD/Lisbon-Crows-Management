// src/components/Layout/ViewModeTabs.jsx
import React, { useState, useEffect } from 'react';
import Tab from '../Tabs/Tab';
import Table from '../Tables/Table';
import TodosPagamentosTable from '../Tables/TodosPagamentosTable';
import ViewModeMerchandiseTabs from './ViewModeMerchandiseTabs';
import ViewModeMonthlySub from './ViewModeMonthlySub';
import useData from '../../hooks/useData';

const ViewModeTabs = () => {
  const [activeTab, setActiveTab] = useState('Atletas');
  const [isMerchandiseTab, setIsMerchandiseTab] = useState(false);
  const { data, loading, error, fetchData } = useData(activeTab);

  useEffect(() => {
    fetchData(activeTab);
    setIsMerchandiseTab(activeTab === 'Merchandise');
  }, [activeTab, fetchData]);

  return (
    <div className="view-mode">
      <div className="tab-container">
        <Tab label="Athletes" isActive={activeTab === 'Atletas'} onClick={() => setActiveTab('Atletas')} />
        <Tab label="Monthly Payments" isActive={activeTab === 'Mensalidade'} onClick={() => setActiveTab('Mensalidade')} />
        <Tab label="Merchandise" isActive={activeTab === 'Merchandise'} onClick={() => setActiveTab('Merchandise')} />
        <Tab label="All Payments" isActive={activeTab === 'Todos_Pagamentos'} onClick={() => setActiveTab('Todos_Pagamentos')} />
        <Tab label="Profit" isActive={activeTab === 'profit'} onClick={() => setActiveTab('profit')} />
      </div>

      <div className="content-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : activeTab === 'Atletas' || activeTab === 'Profit' ? (
          <Table data={data} tableName={activeTab} />
        ) : activeTab === 'Mensalidade' ? (
          <ViewModeMonthlySub />
        ) : activeTab === 'Merchandise' ? (
          <ViewModeMerchandiseTabs />
        ) : activeTab === 'Todos_Pagamentos' ? (
          <TodosPagamentosTable data={data} />
        ) : null}
      </div>
    </div>
  );
};

export default ViewModeTabs;