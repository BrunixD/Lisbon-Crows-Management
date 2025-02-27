// hooks/useAthleteForm.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useAthleteForm = () => {
  const [nome, setNome] = useState('');
  const [nif, setNif] = useState('');
  const [morada, setMorada] = useState('');
  const [email, setEmail] = useState('');
  const [data_nascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cartao_identidade, setCartaoIdentidade] = useState('');
  const [telefone_emergencia, setTelefoneEmergencia] = useState('');
  const [nome_emergencia, setNomeEmergencia] = useState('');
  const [grau_parentesco, setGrauParentesco] = useState('');
  const [equipaId, setEquipaId] = useState(''); // Selected team's ID
  const [equipas, setEquipas] = useState([]); // List of teams
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipas = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from('Equipa').select('id, nome');
        if (error) {
          throw error;
        }
        setEquipas(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (telefone.length !== 9) {
      setError('Phone number must be exactly 9 digits');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Email must contain the "@" symbol');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.from('Atletas').insert([
        {
          nome,
          nif,
          morada,
          email,
          data_nascimento,
          telefone: parseInt(telefone, 10),
          cartao_identidade,
          telefone_emergencia: parseInt(telefone_emergencia, 10),
          nome_emergencia,
          grau_parentesco,
          equipa: equipaId, // Use the selected team's ID (foreign key)
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Athlete created successfully:', data);
      // Reset the form
      setNome('');
      setNif('');
      setMorada('');
      setEmail('');
      setDataNascimento('');
      setTelefone('');
      setCartaoIdentidade('');
      setTelefoneEmergencia('');
      setNomeEmergencia('');
      setGrauParentesco('');
      setEquipaId('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};

export default useAthleteForm;