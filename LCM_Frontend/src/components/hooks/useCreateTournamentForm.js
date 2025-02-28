// hooks/useCreateTournamentForm.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useCreateTournamentForm = () => {
  const [equipas, setEquipas] = useState([]);
  const [equipaId, setEquipaId] = useState('');
  const [torneio, setTorneio] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor_individual, setValorIndividual] = useState('');
  const [valor_equipa, setValorEquipa] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [torneioOptions, setTorneioOptions] = useState([]);
  const [newTorneioOption, setNewTorneioOption] = useState('');

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

    const fetchTorneioOptions = async () => {
        // TODO: Fetch torneio options from the database!
        setTorneioOptions(['INATEL', 'EUL'])
    }
    fetchEquipas();
    fetchTorneioOptions();
  }, []);

  const handleAddTorneioOption = () => {
        if (newTorneioOption.trim() !== '') {
          setTorneioOptions([...torneioOptions, newTorneioOption]);
          setNewTorneioOption('');
        }
      };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from('Competicao').insert([
        {
          equipa_id: equipaId,
          torneio,
          descricao,
          valor_individual,
          valor_equipa,
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Competition created successfully:', data);

      // Reset the form
      setEquipaId('');
      setTorneio('');
      setDescricao('');
      setValorIndividual('');
      setValorEquipa('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};

export default useCreateTournamentForm;