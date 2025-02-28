import React, { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useCompetitionPaymentCheck = (teamId, tournamentId) => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAthletes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch athletes from the selected team
        let { data: athletesData, error: athletesError } = await supabase
          .from('Atletas')
          .select('id, nome')
          .eq('equipa', teamId);

        if (athletesError) throw athletesError;

        // Fetch payment status for each athlete and the given tournament
        const athletesWithPaymentStatus = await Promise.all(
          athletesData.map(async (athlete) => {
            let { data: paymentData, error: paymentError } = await supabase
              .from('Atletas_pagamento_torneios')  // Corrected table name
              .select('data_pagamento')
              .eq('atleta_id', athlete.id)
              .eq('competicao_id', tournamentId);

            if (paymentError) {
              console.error("Error fetching payment status:", paymentError);
              return { ...athlete, paymentStatus: null, data_pagamento: null }; // Indicate error
            }

            return {
              ...athlete,
              paymentStatus: paymentData && paymentData.length > 0,
              data_pagamento: paymentData && paymentData[0]?.data_pagamento,
            };
          })
        );

        setAthletes(athletesWithPaymentStatus || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, [teamId, tournamentId]);

  return { athletes, loading, error };
};

export default useCompetitionPaymentCheck;