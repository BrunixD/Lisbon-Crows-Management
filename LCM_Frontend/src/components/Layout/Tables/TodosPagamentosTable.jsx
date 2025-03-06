// components/Tables/TodosPagamentosTable.jsx
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
                    <th>Payment Type</th>
                    <th>Description</th>
                    <th>Payment Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.uid || `no-uid-${Math.random()}`}>
                        <td>{item.Atletas?.nome || 'Unknown'}</td>
                        <td>{item.tipo_pagamento || ''}</td>
                        <td>
                            {item.tipo_pagamento === 'Mensalidade'
                                ? `Mensalidade de ${item.mes || ''}`
                                : item.tipo_pagamento === 'Torneio'
                                    ? `${item.Competicao?.torneio || ''} (${
                                        (item.valor_individual && item.valor_equipa) ? 'Individual + Team'
                                            : item.valor_individual ? 'Individual'
                                                : item.valor_equipa ? 'Team'
                                                    : 'N/A'
                                    })`
                                    : item.descricao || '-'}
                        </td>
                        <td>{item.data_pagamento || '-'}</td>
                        <td>
                            {item.tipo_pagamento === 'Mensalidade'
                                ? item.Atletas?.equipa?.valor_mensalidade || 0
                                : item.tipo_pagamento === 'Torneio'
                                    ? (parseFloat(item.Competicao.valor_individual) + parseFloat(item.Competicao.valor_equipa)) || 0
                                    : item.valor || 0}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TodosPagamentosTable;