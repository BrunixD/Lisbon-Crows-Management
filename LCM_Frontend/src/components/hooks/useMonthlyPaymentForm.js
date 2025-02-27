// hooks/useMonthlyPaymentForm.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useMonthlyPaymentForm = () => {
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState('');
  const [equipa, setEquipa] = useState('');
  const [valorMensalidade, setValorMensalidade] = useState('');
  const [mes, setMes] = useState('');
  const [data_pagamento, setDataPagamento] = useState(''); // New state for payment date
  const [meses, setMeses] = useState([
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch athletes AND the team's valor_mensalidade
    const fetchAthletes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Modified query to fetch the data
        const { data, error } = await supabase.from('Atletas').select('id, nome, equipa (id, nome, valor_mensalidade)');

        if (error) throw error;
        setAthletes(data || []);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  // Update equipe and monthly values
  useEffect(() => {
    if (selectedAthlete) {
      const athlete = athletes.find((a) => a.id === selectedAthlete);
      if (athlete && athlete.equipa) {
        setEquipa(athlete.equipa.nome);
        setValorMensalidade(athlete.equipa.valor_mensalidade);
      } else {
        setEquipa('');
        setValorMensalidade('');
      }
    } else {
      setEquipa('');
      setValorMensalidade('');
    }
  }, [selectedAthlete, athletes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from('Mensalidade').insert([
        {
          atleta_id: selectedAthlete,
          mes,
          data_pagamento: data_pagamento || null, // Store data_pagamento or null if empty,
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Payment inserted successfully:', data);
      // Reset form fields
      setSelectedAthlete('');
      setMes('');
      setDataPagamento(''); // Reset data_pagamento
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    athletes,
    selectedAthlete,
    setSelectedAthlete,
    equipa,
    valorMensalidade,
    mes,
    setMes,
    data_pagamento,   // Add data_pagamento to the returned object
    setDataPagamento, // Add setDataPagamento
    meses,
    loading,
    error,
    handleSubmit,
  };
};

export default useMonthlyPaymentForm;