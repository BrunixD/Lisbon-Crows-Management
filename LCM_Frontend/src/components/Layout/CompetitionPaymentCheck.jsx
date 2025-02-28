// src/components/Layout/CompetitionPaymentCheck.jsx
import React from 'react';
import useCompetitionPaymentCheck from '../hooks/useCompetitionPaymentCheck'; // Adjust path
import tickIcon from './../../assets/tick.svg';   // Import the tick icon
import crossIcon from './../../assets/cross.svg'; // Import the cross icon

const CompetitionPaymentCheck = ({ teamId, tournamentId }) => {
  const { athletes, loading, error } = useCompetitionPaymentCheck(teamId, tournamentId);

  return (
    <div>
      <h3>Payment Status for Athletes</h3>
      {loading ? (
        <p>Loading athletes...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Payment Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => (
              <tr key={athlete.id}>
                <td>{athlete.nome}</td>
                <td>
                  {athlete.paymentStatus ? (
                    <img src={tickIcon} alt="Paid" style={{ width: '20px', height: '20px' }} />
                  ) : (
                    <img src={crossIcon} alt="Not Paid" style={{ width: '20px', height: '20px' }} />
                  )}
                </td>
                <td>
                  {athlete.data_pagamento ? new Date(athlete.data_pagamento).toLocaleDateString() : 'Not Paid'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompetitionPaymentCheck;