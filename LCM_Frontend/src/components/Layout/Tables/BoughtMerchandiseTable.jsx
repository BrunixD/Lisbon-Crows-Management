// components/Tables/BoughtMerchandiseTable.jsx
import React from 'react';
import './../../Styles/TabTable.css';

const BoughtMerchandiseTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No bought merchandise data available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Merchandise</th>
          <th>Athlete</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.Merchandise?.nome || 'Unknown'}</td>
            <td>{item.Atletas?.nome || 'Unknown'}</td>
            <td>{item.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BoughtMerchandiseTable;