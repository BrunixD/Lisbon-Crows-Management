import React, { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useCompetitionPaymentCheck = (teamId, tournamentId) => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAthletesWithPaymentStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: athletesData, error: athletesError } = await supabase
          .from('Atletas')
          .select('id, nome')
          .eq('equipa', teamId);

        if (athletesError) {
          throw athletesError;
        }

        // Fetch payment status for each athlete
        const athletesWithPaymentStatus = await Promise.all(
          athletesData.map(async (athlete) => {
            const { data: paymentData, error: paymentError } = await supabase
              .from('Atletas_pagamento_torneios')
              .select('valor_individual, valor_equipa, data_pagamento')
              .eq('atleta_id', athlete.id)
              .eq('competicao_id', tournamentId)
              .order('data_pagamento', { ascending: false }); // Order by payment date (newest first)

            if (paymentError) {
              console.error("Error fetching payment status:", paymentError);
              return { ...athlete, valor_individualPayment: false, valor_equipaPayment: false, data_pagamento: null }; // Default to false and null
            }

            let individualPayment = false;
            let teamPayment = false;
            let lastDate = null;

            for (const payment of paymentData) {
              if (payment.valor_individual) {
                individualPayment = true;
              }
              if (payment.valor_equipa) {
                teamPayment = true;
              }
              if (payment.data_pagamento) {
                    lastDate = payment.data_pagamento;
                }

              if (individualPayment && teamPayment) {
                break; // Exit if both payments are true
              }
            }

            return {
              ...athlete,
              valor_individual: individualPayment,
              valor_equipa: teamPayment,
              data_pagamento: lastDate
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

    fetchAthletesWithPaymentStatus();
  }, [teamId, tournamentId]);

  return { athletes, loading, error };
};

export default useCompetitionPaymentCheck;