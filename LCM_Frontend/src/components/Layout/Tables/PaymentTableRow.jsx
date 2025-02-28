// components/Layout/PaymentTableRow.jsx
import React from 'react';
import tickIcon from '../../../assets/tick.svg';   // Import the tick icon
import crossIcon from '../../../assets/cross.svg'; // Import the cross icon

const PaymentTableRow = ({ athlete, allMonths }) => {
  return (
    <tr key={athlete.id}>
      <td>{athlete.nome}</td>
      {allMonths.map((month) => {
        const paymentForMonth = athlete.Mensalidade && Array.isArray(athlete.Mensalidade)
          ? athlete.Mensalidade.find((payment) => payment.mes === month)
          : null;

        return (
          <td key={`${athlete.id}-${month}`} style={{ textAlign: 'center' }}>
            {paymentForMonth ? (
              paymentForMonth.data_pagamento ? (
                <img src={tickIcon} alt="Paid" style={{ width: '20px', height: '20px' }} /> // Tick icon if paid
              ) : (
                <img src={crossIcon} alt="Not Paid" style={{ width: '20px', height: '20px' }} /> // Cross icon if not paid
              )
            ) : (
              <img src={crossIcon} alt="Not Paid" style={{ width: '20px', height: '20px' }} /> // Cross icon if no payment record
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default PaymentTableRow;