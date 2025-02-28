// components/Layout/InsertModeTabs.jsx
import React, { useState } from 'react';
import Tab from '../Tabs/Tab';
import AthleteForm from '../../Forms/AthleteForm'; //Import the forms
import MonthlyPaymentForm from '../../Forms/MonthlyPaymentForm';
import MerchandiseForm from '../../Forms/MerchandiseForm';
import ProfitForm from '../../Forms/ProfitForm';

const InsertModeTabs = () => {
  const [activeTab, setActiveTab] = useState('Atletas');

  return (
    <div className="insert-mode">
      <div className="tab-container">
        <Tab label="Athletes" isActive={activeTab === 'Atletas'} onClick={() => setActiveTab('Atletas')} />
        <Tab label="Monthly Payments" isActive={activeTab === 'Mensalidade'} onClick={() => setActiveTab('Mensalidade')} />
        <Tab label="Merchandise" isActive={activeTab === 'merchandise'} onClick={() => setActiveTab('merchandise')} />
        <Tab label="Profit" isActive={activeTab === 'profit'} onClick={() => setActiveTab('profit')} />
      </div>
      <div className="content-container">
        {activeTab === 'Atletas' && <AthleteForm />}
        {activeTab === 'Mensalidade' && <MonthlyPaymentForm />}
        {activeTab === 'merchandise' && <MerchandiseForm />}
        {activeTab === 'profit' && <ProfitForm />}
      </div>
    </div>
  );
};

export default InsertModeTabs;