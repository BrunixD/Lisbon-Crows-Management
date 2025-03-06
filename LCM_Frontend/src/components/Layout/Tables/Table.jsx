// Table.jsx
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
          <tr key={row.id || `no-id-${Math.random()}`}>
            {columns.map((column) => {
              let displayValue = '';

              if (column === 'equipa') {
                // Safest possible check:
                displayValue = row.equipa && typeof row.equipa === 'object' && row.equipa.nome ? row.equipa.nome : '';
              } else {
                const cellValue = row[column];

                if (typeof cellValue === 'object' && cellValue !== null) {
                  try {
                    displayValue = JSON.stringify(cellValue); // Convert to JSON string
                  } catch (e) {
                    displayValue = 'Error converting to string';
                  }
                } else if (cellValue !== null && cellValue !== undefined) {
                  displayValue = cellValue.toString();
                } else {
                  displayValue = ''; // Handle null or undefined
                }
              }
              return <td key={`${row.id}-${column}`}>{displayValue}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;