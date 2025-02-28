// components/Layout/ViewModeMerchandiseTabs.jsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Tab from './Tab';
import Table from '../Tables/Table';
import BoughtMerchandiseTable from '../Tables/BoughtMerchandiseTable';
import useData from '../../hooks/useData';

const ViewModeMerchandiseTabs = () => {
  const [activeMerchandiseTab, setActiveMerchandiseTab] = useState('Merchandise Items');

  const { data, loading, error, fetchData } = useData(
    activeMerchandiseTab === 'Merchandise Items' ? 'Merchandise' : 'Merchandise_Comprado'
  );

  const handleTabClick = useCallback((tabName) => {
    setActiveMerchandiseTab(tabName);
  }, []);

  useEffect(() => {
    fetchData(activeMerchandiseTab === 'Merchandise Items' ? 'Merchandise' : 'Merchandise_Comprado');
  }, [activeMerchandiseTab, fetchData]);

  const transformMerchandiseData = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    return data.map(item => {
      const transformedItem = {};
      for (const key in item) {
          if (typeof item[key] === 'object' && item[key] !== null) {
           transformedItem[key] = String(item[key]);
        }
          else if (typeof item[key] === 'function') {
            transformedItem[key] = String(item[key]);
        }
         else {
          transformedItem[key] = item[key];
        }
      }
      return transformedItem;
    });
  };

  const transformedMerchandiseData = useMemo(() => {
    if (activeMerchandiseTab === 'Merchandise Items') {
      return transformMerchandiseData(data);
    }
    return data; // No transformation needed for Bought Merchandise
  }, [data, activeMerchandiseTab]);

  return (
    <>
      <div className="mode-tabs">
        <Tab label="Merchandise Items" isActive={activeMerchandiseTab === 'Merchandise Items'} onClick={() => handleTabClick('Merchandise Items')} />
        <Tab label="Bought Merchandise" isActive={activeMerchandiseTab === 'Merchandise_Comprado'} onClick={() => handleTabClick('Merchandise_Comprado')} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (activeMerchandiseTab === 'Merchandise Items' ? (
        <Table data={transformedMerchandiseData} tableName={activeMerchandiseTab} />
      ) : (
        <BoughtMerchandiseTable data={data} />
      ))}
    </>
  );
};

export default ViewModeMerchandiseTabs;