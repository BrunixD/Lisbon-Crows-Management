// src/components/Layout/ContentDisplay.jsx
import React from 'react';
import Table from './Tables/Table';
import TodosPagamentosTable from './Tables/TodosPagamentosTable';
import ViewModeMerchandiseTabs from './Tabs/ViewModeMerchandiseTabs';
import ViewModeMonthlySub from './Tabs/ViewModeMonthlySub'; // Import ViewModeMonthlySub

const ContentDisplay = ({ activeTab, data, loading, error, isMerchandiseTab }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (activeTab === 'Todos_Pagamentos') {
    return <TodosPagamentosTable data={data} />;
  }

  if (activeTab === 'Mensalidade') {
    return <ViewModeMonthlySub />; // Render ViewModeMonthlySub for Mensalidade
  }

  if (isMerchandiseTab) {
    return <ViewModeMerchandiseTabs />;
  }

  return <Table data={data} tableName={activeTab} />;
};

export default ContentDisplay;