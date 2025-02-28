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
    handleAthleteSelect,
    selectedAthleteIds,
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
          {athletes.map((athlete) => (
            <div key={athlete.id}>
              <label>
                <input
                  type="checkbox"
                  value={athlete.id}
                  onChange={handleAthleteSelect}
                  checked={selectedAthleteIds.includes(athlete.id.toString())} // Ensure IDs are same type (string)
                />
                {athlete.nome}
              </label>
            </div>
          ))}
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