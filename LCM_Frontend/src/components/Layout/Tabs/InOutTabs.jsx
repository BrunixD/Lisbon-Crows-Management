// src/components/Layout/InOutTabs.jsx
import React, { useState } from 'react';
import Tab from './Tab';
import InForm from '../../Forms/InForm';
import OutForm from '../../Forms/OutForm';

const InOutTabs = () => {
    const [activeTab, setActiveTab] = useState('In');

    return (
        <div>
            <div className="tab-container">
                <Tab label="In" isActive={activeTab === 'In'} onClick={() => setActiveTab('In')} />
                <Tab label="Out" isActive={activeTab === 'Out'} onClick={() => setActiveTab('Out')} />
            </div>
            <div className="content-container">
                {activeTab === 'In' && <InForm />}
                {activeTab === 'Out' && <OutForm />}
            </div>
        </div>
    );
};

export default InOutTabs;