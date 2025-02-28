// hooks/useAthletePaymentForm.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useAthletePaymentForm = () => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState('');
  const [equipaId, setEquipaId] = useState('');
  const [athletes, setAthletes] = useState([]);
  const [selectedAthleteIds, setSelectedAthleteIds] = useState([]);
  const [data_pagamento, setDataPagamento] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: competitionsData, error: competitionsError } = await supabase
          .from('Competicao')
          .select('id, torneio, equipa_id');

        if (competitionsError) throw competitionsError;
        setCompetitions(competitionsData || []);

        // If a competition is already selected, fetch athletes for that team
        if (selectedCompetitionId) {
          const competition = competitionsData.find(c => c.id === parseInt(selectedCompetitionId));
          if (competition) {
            setEquipaId(competition.equipa_id);
            const { data: athletesData, error: athletesError } = await supabase
              .from('Atletas')
              .select('id, nome')
              .eq('equipa', competition.equipa_id);

            if (athletesError) throw athletesError;
            setAthletes(athletesData || []);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCompetitionId]);

  const handleCompetitionChange = (e) => {
    setSelectedCompetitionId(e.target.value);
    setSelectedAthleteIds([]); // Clear selected athletes
  };

  const handleAthleteSelect = (e) => {
    const athleteId = e.target.value;
    setSelectedAthleteIds(prev =>
      e.target.checked
        ? [...prev, athleteId]
        : prev.filter(id => id !== athleteId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare the data to be inserted into the AthleteTournamentPayments table
      const paymentsToInsert = selectedAthleteIds.map(atleta_id => ({
        atleta_id,
        competicao_id: selectedCompetitionId,
        data_pagamento
      }));

      // Insert the data into Supabase
      const { data, error } = await supabase
        .from('Atletas_pagamento_torneios')
        .insert(paymentsToInsert);

      if (error) throw error;

      console.log('Payments created successfully:', data);

      // Reset the form
      setSelectedAthleteIds([]);
      setDataPagamento('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    competitions,
    selectedCompetitionId,
    handleCompetitionChange,
    athletes,
    handleAthleteSelect,
    selectedAthleteIds,
    data_pagamento,
    setDataPagamento,
    handleSubmit,
    loading,
    error,
  };
};

export default useAthletePaymentForm;