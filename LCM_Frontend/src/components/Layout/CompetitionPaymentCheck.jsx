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
              <th>Individual Payment</th>
              <th>Team Payment</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => (
              <tr key={athlete.id}>
                <td>{athlete.nome}</td>
                <td>
                  {athlete.valor_individual ? (
                    <img src={tickIcon} alt="Individual Paid" style={{ width: '20px', height: '20px' }} />
                  ) : (
                    <img src={crossIcon} alt="Individual Not Paid" style={{ width: '20px', height: '20px' }} />
                  )}
                </td>
                <td>
                  {athlete.valor_equipa ? (
                    <img src={tickIcon} alt="Team Paid" style={{ width: '20px', height: '20px' }} />
                  ) : (
                    <img src={crossIcon} alt="Team Not Paid" style={{ width: '20px', height: '20px' }} />
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