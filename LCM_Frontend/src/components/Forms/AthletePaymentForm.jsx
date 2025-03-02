// src/components/Forms/AthletePayment.jsx
import React from 'react';
import useAthletePaymentForm from '../hooks/useAthletePaymentForm';
import '../Styles/Form.css';

const AthletePaymentForm = () => {
  const {
      competitions,
      selectedCompetitionId,
      handleCompetitionChange,
      athletes,
      selectedAthletePayments,
      handleAthletePaymentChange,
      data_pagamento,
      setDataPagamento,
      handleSubmit,
      loading,
      error,
  } = useAthletePaymentForm();

  return (
      <form className="form" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="competition">Competition:</label>
              <select
                  id="competition"
                  className="input"
                  value={selectedCompetitionId}
                  onChange={handleCompetitionChange}
                  required
              >
                  <option value="">Select a Competition</option>
                  {competitions.map((competition) => (
                      <option key={competition.id} value={competition.id}>
                          {competition.torneio} - {competition.equipa_id}
                      </option>
                  ))}
              </select>
          </div>

          {athletes.length > 0 && (
              <div>
                  <label>Select Athletes:</label>
                  {athletes.map((athlete) => {
                      // Payment Info (Individual & Team)
                      const payment = selectedAthletePayments[athlete.id] || {};
                      const isIndividualPaid = payment?.valor_individual || false; //check if its not null
                      const isTeamPaid = payment?.valor_equipa || false;

                      return (
                          <div key={athlete.id}>
                              <label>
                                {isIndividualPaid && isTeamPaid ? '' : athlete.nome + ': '}
                              </label>
                              {(isIndividualPaid) ?
                                <label>
                                    Individual
                                    <input
                                        type="checkbox"
                                        name="valor_individual"
                                        onChange={(e) => handleAthletePaymentChange(athlete.id, 'valor_individual', e.target.checked)}
                                    />
                                </label>
                              : ''}
                              {(isTeamPaid) ?
                                <label>
                                  Team
                                    <input
                                        type="checkbox"
                                        name="valor_equipa"
                                        onChange={(e) => handleAthletePaymentChange(athlete.id, 'valor_equipa', e.target.checked)}
                                    />
                                </label>
                              : ''}
                              <br></br>
                          </div>
                      );
                  })}
              </div>
          )}

          <div>
              <label htmlFor="data_pagamento">Payment Date:</label>
              <input
                  type="date"
                  id="data_pagamento"
                  className="input"
                  value={data_pagamento}
                  onChange={(e) => setDataPagamento(e.target.value)}
                  required
              />
          </div>

          <button type="submit" disabled={loading} className="button">
              {loading ? 'Creating...' : 'Register Payments'}
          </button>
          {error && <p className="error">{error}</p>}
      </form>
  );
};

export default AthletePaymentForm;