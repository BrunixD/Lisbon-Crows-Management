// src/components/Forms/OutForm.jsx
import React from 'react';
import useOutForm from '../hooks/useOutForm'; // Hook import
import '../Styles/Form.css';

const OutForm = () => {
  const {
    descricao,
    setDescricao,
    data_pagamento,
    setDataPagamento,
    valor,
    setValor,
    handleSubmit,
    loading,
    error,
  } = useOutForm();

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Out Form</h3>

      <div>
        <label htmlFor="descricao">Descricao:</label>
        <input
          type="text"
          id="descricao"
          className="input"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="data_pagamento">Data Pagamento:</label>
        <input
          type="date"
          id="data_pagamento"
          className="input"
          value={data_pagamento}
          onChange={(e) => setDataPagamento(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="valor">Valor:</label>
        <input
          type="number"
          id="valor"
          className="input"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading} className="button">
        {loading ? 'Creating...' : 'Create Out'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default OutForm;