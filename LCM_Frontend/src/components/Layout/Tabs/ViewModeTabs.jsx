// ViewModeTabs.jsx
import React, { useState, useEffect } from 'react';
import Tab from './Tab';
import Table from '../Tables/Table';
import TodosPagamentosTable from '../Tables/TodosPagamentosTable';
import ViewModeMerchandiseTabs from './ViewModeMerchandiseTabs';
import ViewModeMonthlySubTabs from './ViewModeMonthlySubTabs';
import CompetitionViewTabs from './CompetitionViewTabs';
import useData from '../../hooks/useData';
import ProfitView from './ProfitView';

const ViewModeTabs = () => {
  const [activeTab, setActiveTab] = useState('Atletas');
  const [isMerchandiseTab, setIsMerchandiseTab] = useState(false);
  const { data, loading, error, fetchData } = useData();

  useEffect(() => {
    const fetchDataForTab = async () => {
      await fetchData(activeTab);
      setIsMerchandiseTab(activeTab === 'Merchandise');
    };

    fetchDataForTab();
  }, [activeTab, fetchData]);

  return (
    <div className="view-mode">
      <div className="tab-container">
        <Tab label="Athletes" isActive={activeTab === 'Atletas'} onClick={() => setActiveTab('Atletas')} />
        <Tab label="Monthly Payments" isActive={activeTab === 'Mensalidade'} onClick={() => setActiveTab('Mensalidade')} />
        <Tab label="Merchandise" isActive={activeTab === 'Merchandise'} onClick={() => setActiveTab('Merchandise')} />
        <Tab label="All Payments" isActive={activeTab === 'Todos_Pagamentos'} onClick={() => setActiveTab('Todos_Pagamentos')} />
        <Tab label="Competition" isActive={activeTab === 'Competicao'} onClick={() => setActiveTab('Competicao')} />
        <Tab label="Profit" isActive={activeTab === 'Profit'} onClick={() => setActiveTab('Profit')} />
        <Tab label="In Values" isActive={activeTab === 'Entrada_Valores'} onClick={() => setActiveTab('Entrada_Valores')} />
        <Tab label="Out Values" isActive={activeTab === 'Saida_Valores'} onClick={() => setActiveTab('Saida_Valores')} />
      </div>

      <div className="content-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <>
            {activeTab === 'Atletas' && <Table data={data} tableName={activeTab} />}
            {activeTab === 'Mensalidade' && <ViewModeMonthlySubTabs />}
            {activeTab === 'Merchandise' && <ViewModeMerchandiseTabs />}
            {activeTab === 'Todos_Pagamentos' && <TodosPagamentosTable data={data} />}
            {activeTab === 'Competicao' && <CompetitionViewTabs />}
            {activeTab === 'Profit' && <ProfitView />}
            {activeTab === 'Entrada_Valores' && <Table data={data} tableName={activeTab} />}
            {activeTab === 'Saida_Valores' && <Table data={data} tableName={activeTab} />}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewModeTabs;