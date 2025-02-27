// components/Forms/AthleteForm.jsx
import React from 'react';
import useAthleteForm from '../hooks/useAthleteForm'; // Adjust path

const AthleteForm = () => {
  const {
    nome,
    setNome,
    nif,
    setNif,
    morada,
    setMorada,
    email,
    setEmail,
    data_nascimento,
    setDataNascimento,
    telefone,
    setTelefone,
    cartao_identidade,
    setCartaoIdentidade,
    telefone_emergencia,
    setTelefoneEmergencia,
    nome_emergencia,
    setNomeEmergencia,
    grau_parentesco,
    setGrauParentesco,
    equipaId,
    setEquipaId,
    equipas,
    loading,
    error,
    handleSubmit,
  } = useAthleteForm();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="nif">NIF:</label>
        <input type="text" id="nif" value={nif} onChange={(e) => setNif(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="morada">Morada:</label>
        <input type="text" id="morada" value={morada} onChange={(e) => setMorada(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="data_nascimento">Data de Nascimento:</label>
        <input type="date" id="data_nascimento" value={data_nascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="telefone">Telefone:</label>
        <input type="number" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="cartao_identidade">Cartão de Identidade:</label>
        <input type="text" id="cartao_identidade" value={cartao_identidade} onChange={(e) => setCartaoIdentidade(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="telefone_emergencia">Telefone Emergência:</label>
        <input type="number" id="telefone_emergencia" value={telefone_emergencia} onChange={(e) => setTelefoneEmergencia(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="nome_emergencia">Nome Emergência:</label>
        <input type="text" id="nome_emergencia" value={nome_emergencia} onChange={(e) => setNomeEmergencia(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="grau_parentesco">Grau Parentesco:</label>
        <input type="text" id="grau_parentesco" value={grau_parentesco} onChange={(e) => setGrauParentesco(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="equipa">Equipa:</label>
        <select id="equipa" value={equipaId} onChange={(e) => setEquipaId(e.target.value)} required>
          <option value="">Selecione uma Equipa</option>
          {equipas.map((equipa) => (
            <option key={equipa.id} value={equipa.id}>
              {equipa.nome}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Athlete'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AthleteForm;