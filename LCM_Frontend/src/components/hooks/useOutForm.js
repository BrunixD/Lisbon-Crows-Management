// src/components/hooks/useOutForm.js
import { useState } from 'react';
import { supabase } from '../../createClient';

const useOutForm = () => {
  const [descricao, setDescricao] = useState('');
  const [data_pagamento, setDataPagamento] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from('Saida_Valores').insert([
        {
          descricao,
          data_pagamento,
          valor,
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Valor inserted successfully:', data);

      // Reset form fields
      setDescricao('');
      setDataPagamento('');
      setValor('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    descricao,
    setDescricao,
    data_pagamento,
    setDataPagamento,
    valor,
    setValor,
    handleSubmit,
    loading,
    error,
  };
};

export default useOutForm;