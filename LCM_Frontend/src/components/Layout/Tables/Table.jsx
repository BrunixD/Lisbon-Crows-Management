// components/Tables/Table.jsx
import React from 'react';

const Table = ({ data, tableName }) => {
  if (!data || data.length === 0) {
    return <p>No data available for {tableName}.</p>;
  }

  // Extract column names from the first object in the data array
  let columns = [];

  if (data[0]) {
    // Handle nested equipa data
    columns = Object.keys(data[0]).filter(column => column !== 'equipa');
    if (data[0].equipa) {
      columns.push('equipa');
    }
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id || `no-uid-${Math.random()}`}>
            {columns.map((column) => {
              if (column === 'equipa') {
                  // Safest possible check:
                  const teamName = row.equipa && typeof row.equipa === 'object' && row.equipa.nome ? row.equipa.nome : '';
                return <td key={`${row.id}-${column}`}>{teamName}</td>;
              } else {
                const cellValue = row[column];
                //Check if the cell value is an object, if so, convert to string
                const displayValue = typeof cellValue === 'object' && cellValue !== null ? JSON.stringify(cellValue) : cellValue;
                return <td key={`${row.id}-${column}`}>{displayValue}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;