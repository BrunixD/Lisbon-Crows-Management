// components/Layout/ViewModePaymentTabs.jsx
import React, { useState } from 'react';
import Tab from '../Tabs/Tab';
import PaymentTable from '../Layout/PaymentTable';

const ViewModePaymentTabs = () => {
  const [activeTab, setActiveTab] = useState('A');

  return (
    <div>
      <div className="mode-tabs">
        <Tab label="Equipa A" isActive={activeTab === 'A'} onClick={() => setActiveTab('A')} />
        <Tab label="Equipa B" isActive={activeTab === 'B'} onClick={() => setActiveTab('B')} />
        <Tab label="Feminino" isActive={activeTab === 'Feminino'} onClick={() => setActiveTab('Feminino')} />
        <Tab label="Social" isActive={activeTab === 'Social'} onClick={() => setActiveTab('Social')} />
      </div>
      <PaymentTable activeTab={activeTab} />
    </div>
  );
};

export default ViewModePaymentTabs;