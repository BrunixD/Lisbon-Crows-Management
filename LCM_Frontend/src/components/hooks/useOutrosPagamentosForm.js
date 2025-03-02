// hooks/useOutrosPagamentosForm.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useOutrosPagamentosForm = () => {
  const [atletaId, setAtletaId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  const [valor, setValor] = useState('');
  const [outrosDetalhes, setOutrosDetalhes] = useState('');
  const [athletes, setAthletes] = useState([]); // For Athlete selector
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const tipoPagamento = 'Outro'; // Set tipoPagamento to "Outro"

  useEffect(() => {
    const fetchAthletes = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from('Atletas').select('id, nome');
        if (error) {
          throw error;
        }
        setAthletes(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from('Todos_Pagamentos').insert([
        {
          atleta_id: atletaId,
          tipo_pagamento: tipoPagamento, // Set to "Outro"
          descricao,
          data_pagamento: dataPagamento, // Use dataPagamento
          valor,
          outros_detalhes: outrosDetalhes, // Use outrosDetalhes
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Payment inserted successfully:', data);

      // Reset form fields
      setAtletaId('');
      setDescricao('');
      setDataPagamento('');
      setValor('');
      setOutrosDetalhes('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};

export default useOutrosPagamentosForm;