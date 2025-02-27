// components/Forms/MonthlyPaymentForm.jsx
import React from 'react';
import useMonthlyPaymentForm from '../hooks/useMonthlyPaymentForm';

const MonthlyPaymentForm = () => {
  const {
    athletes,
    selectedAthlete,
    setSelectedAthlete,
    equipa,
    valorMensalidade,
    mes,
    setMes,
    data_pagamento,
    setDataPagamento,
    meses,
    loading,
    error,
    handleSubmit,
  } = useMonthlyPaymentForm();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="atleta">Atleta:</label>
        <select id="atleta" value={selectedAthlete} onChange={(e) => setSelectedAthlete(e.target.value)} required>
          <option value="">Selecione um Atleta</option>
          {athletes.map((athlete) => (
            <option key={athlete.id} value={athlete.id}>
              {athlete.nome}
            </option>
          ))}
        </select>
      </div>

      {equipa && (
        <div>
          <label>Equipa:</label>
          <input type="text" value={equipa} readOnly />
        </div>
      )}

      {valorMensalidade && (
        <div>
          <label>Valor Mensalidade:</label>
          <input type="text" value={valorMensalidade} readOnly />
        </div>
      )}

      <div>
        <label htmlFor="mes">Mês:</label>
        <select id="mes" value={mes} onChange={(e) => setMes(e.target.value)} required>
          <option value="">Selecione um Mês</option>
          {meses.map((mes) => (
            <option key={mes} value={mes}>
              {mes}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="data_pagamento">Data de Pagamento (Opcional):</label>
        <input
          type="date"
          id="data_pagamento"
          value={data_pagamento}
          onChange={(e) => setDataPagamento(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Mensalidade'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default MonthlyPaymentForm;