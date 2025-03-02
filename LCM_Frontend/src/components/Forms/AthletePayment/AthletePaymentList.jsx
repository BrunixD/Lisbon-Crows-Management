// src/components/Forms/AthletePayment/AthletePaymentList.jsx
import React from 'react';

const AthletePaymentList = ({ athletes, selectedAthletePayments, handleAthletePaymentChange,submittedPayments ,selectedCompetitionId }) => {

  return (
    <div>
      <label>Select Athletes:</label>
      {athletes?.map((athlete, index) => { 
        return (
          <div key={athlete?.id}>
            <label>
              {athlete?.nome}
            </label>
            <label>
              Individual:
              <input
                type="checkbox"
                name="valor_individual"
                checked={!!selectedAthletePayments?.[athlete.id]?.valor_individual}
                onChange={(e) => handleAthletePaymentChange(athlete.id, 'valor_individual', e.target.checked)}
             
              />
            </label>
            <label>
              Team:
              <input
                type="checkbox"
                name="valor_equipa"
                checked={!!selectedAthletePayments?.[athlete.id]?.valor_equipa}
                onChange={(e) => handleAthletePaymentChange(athlete.id, 'valor_equipa', e.target.checked)}
               
              />
            </label>
          </div>
        );
      })|| "" }
    </div>
  );
};

export default AthletePaymentList;