// components/Layout/InsertModeTabs.jsx
import React, { useState } from 'react';
import Tab from '../Tabs/Tab';
import AthleteForm from '../../Forms/AthleteForm'; //Import the forms
import MonthlyPaymentForm from '../../Forms/MonthlyPaymentForm';
import MerchandiseForm from '../../Forms/MerchandiseForm';
import InOutTabs from './InOutTabs';
import CreateTournamentForm from '../../Forms/CreateTournamentForm'; // Import CreateTournamentForm
import AthletePaymentForm from '../../Forms/AthletePayment/AthletePaymentForm';
import OutrosPagamentosForm from "../../Forms/OutrosPagamentosForm";

const InsertModeTabs = () => {
  const [activeTab, setActiveTab] = useState('Atletas');

  return (
    <div className="insert-mode">
      <div className="tab-container">
        <Tab label="Athletes" isActive={activeTab === 'Atletas'} onClick={() => setActiveTab('Atletas')} />
        <Tab label="Monthly Payments" isActive={activeTab === 'Mensalidade'} onClick={() => setActiveTab('Mensalidade')} />
        <Tab label="Merchandise" isActive={activeTab === 'merchandise'} onClick={() => setActiveTab('merchandise')} />
        <Tab label="Create Tournament" isActive={activeTab === 'createTournament'} onClick={() => setActiveTab('createTournament')} /> {/* Create Tournament Tab */}
        <Tab label="Athlete Payment" isActive={activeTab === 'athletePayment'} onClick={() => setActiveTab('athletePayment')} /> {/* Athlete Payment Tab */}
        <Tab label="Other Payments" isActive={activeTab === 'outrosPagamentos'} onClick={() => setActiveTab('outrosPagamentos')} />
        <Tab label="IN/OUT Values" isActive={activeTab === 'In/Out'} onClick={() => setActiveTab('In/Out')} />
      </div>
      <div className="content-container">
        {activeTab === 'Atletas' && <AthleteForm />}
        {activeTab === 'Mensalidade' && <MonthlyPaymentForm />}
        {activeTab === 'merchandise' && <MerchandiseForm />}
        {activeTab === 'createTournament' && <CreateTournamentForm />} {/* Render CreateTournamentForm */}
        {activeTab === 'athletePayment' && <AthletePaymentForm />} {/* Render AthletePaymentForm */}
        {activeTab === 'outrosPagamentos' && <OutrosPagamentosForm />}
        {activeTab === 'In/Out' && <InOutTabs />} {/* Render InOutTabs */}
      </div>
    </div>
  );
};

export default InsertModeTabs;