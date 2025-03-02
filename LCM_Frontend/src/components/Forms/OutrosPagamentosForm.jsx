// components/Forms/OutrosPagamentosForm.jsx
import React from 'react';
import useOutrosPagamentosForm from '../hooks/useOutrosPagamentosForm';
import '../Styles/Form.css'; // Import CSS

const OutrosPagamentosForm = () => {
  const {
    atletaId,
    setAtletaId,
    descricao,
    setDescricao,
    dataPagamento,
    setDataPagamento,
    valor,
    setValor,
    outrosDetalhes,
    setOutrosDetalhes,
    loading,
    error,
    handleSubmit,
    athletes,
  } = useOutrosPagamentosForm();

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Outros Pagamentos</h3>
      <div>
        <label htmlFor="atletaId">Atleta:</label>
        <select
          id="atletaId"
          className="input"
          value={atletaId}
          onChange={(e) => setAtletaId(e.target.value)}
          required
        >
          <option value="">Selecione um Atleta</option>
          {athletes.map((athlete) => (
            <option key={athlete.id} value={athlete.id}>
              {athlete.nome}
            </option>
          ))}
        </select>
      </div>

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
        <label htmlFor="dataPagamento">Data Pagamento:</label>
        <input
          type="date"
          id="dataPagamento"
          className="input"
          value={dataPagamento}
          onChange={(e) => setDataPagamento(e.target.value)}
          required
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

      <div>
        <label htmlFor="outrosDetalhes">Outros Detalhes:</label>
        <textarea
          id="outrosDetalhes"
          className="input"
          value={outrosDetalhes}
          onChange={(e) => setOutrosDetalhes(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading} className="button">
        {loading ? 'Creating...' : 'Create Pagamento'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default OutrosPagamentosForm;