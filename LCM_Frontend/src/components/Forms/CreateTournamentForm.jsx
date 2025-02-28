// components/Forms/CreateTournamentForm.jsx
import React from 'react';
import useCreateTournamentForm from '../hooks/useCreateTournamentForm';
import '../Styles/Form.css'; // Import CSS

const CreateTournamentForm = () => {
  const {
    equipas,
    equipaId,
    setEquipaId,
    torneio,
    setTorneio,
    descricao,
    setDescricao,
    valor_individual,
    setValorIndividual,
    valor_equipa,
    setValorEquipa,
    loading,
    error,
    handleSubmit,
    torneioOptions,
    newTorneioOption,
    setNewTorneioOption,
    handleAddTorneioOption
  } = useCreateTournamentForm();

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="equipa">Equipa:</label>
        <select id="equipa" className="input" value={equipaId} onChange={(e) => setEquipaId(e.target.value)} required>
          <option value="">Selecione uma Equipa</option>
          {equipas.map((equipa) => (
            <option key={equipa.id} value={equipa.id}>
              {equipa.nome}
            </option>
          ))}
        </select>
      </div>

       <div>
                  <label htmlFor="torneio">Torneio:</label>
                  <select
                    id="torneio"
                    className="input"
                    value={torneio}
                    onChange={(e) => setTorneio(e.target.value)}
                    required
                  >
                    <option value="">Selecione um Torneio</option>
                    {torneioOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    id="newTorneioOption"
                    className="input"
                    value={newTorneioOption}
                    onChange={(e) => setNewTorneioOption(e.target.value)}
                    placeholder="Novo Torneio"
                  />
                  <button type="button" onClick={handleAddTorneioOption}>
                    Adicionar Torneio
                  </button>
                </div>

      <div>
        <label htmlFor="descricao">Descricao:</label>
        <input type="text" id="descricao" className="input" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="valor_individual">Valor Individual:</label>
        <input type="number" id="valor_individual" className="input" value={valor_individual} onChange={(e) => setValorIndividual(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="valor_equipa">Valor Equipa:</label>
        <input type="number" id="valor_equipa" className="input" value={valor_equipa} onChange={(e) => setValorEquipa(e.target.value)} required />
      </div>
        {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading} className="button">
        {loading ? 'Creating...' : 'Create Competition'}
      </button>

    </form>
  );
};

export default CreateTournamentForm;