// src/components/Tables/TodosPagamentosTable.jsx
import React from 'react';

const TodosPagamentosTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No payments data available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Athlete</th>
          <th>Tipo Pagamento</th>
          <th>Descricao</th>
          <th>Valor</th>
          <th>Data Pagamento</th>
          {/* Add other relevant columns here */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.uid}>
            <td>{item.Atletas?.nome || 'Unknown'}</td>
            <td>{item.tipo_pagamer || ''}</td>
            <td>{item.descricao || ''}</td>
            <td>{item.valor || 0}</td>
            <td>{item.data_pagamer || ''}</td>
            {/* Render data for other columns here */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodosPagamentosTable;