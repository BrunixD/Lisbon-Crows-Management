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
          <tr key={row.id}>
            {columns.map((column) => {
              if (column === 'equipa') {
                // Render team name instead of ID
                return <td key={column}>{row.equipa ? row.equipa.nome : ''}</td>;
              } else {
                return <td key={column}>{row[column]}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;