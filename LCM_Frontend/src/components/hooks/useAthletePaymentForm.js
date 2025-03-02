// hooks/useAthletePaymentForm.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useAthletePaymentForm = () => {
    const [competitions, setCompetitions] = useState([]);
    const [selectedCompetitionId, setSelectedCompetitionId] = useState('');
    const [equipaId, setEquipaId] = useState('');
    const [athletes, setAthletes] = useState([]);
    const [data_pagamento, setDataPagamento] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAthletePayments, setSelectedAthletePayments] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data: competitionsData, error: competitionsError } = await supabase
                    .from('Competicao')
                    .select('id, torneio, equipa_id, valor_equipa, valor_individual');

                if (competitionsError) throw competitionsError;
                setCompetitions(competitionsData || []);

                if (selectedCompetitionId) {
                    const competition = competitionsData.find(c => c.id === parseInt(selectedCompetitionId));
                    if (competition) {
                        setEquipaId(competition.equipa_id);

                        // Fetch athletes for the selected team
                        const { data: athletesData, error: athletesError } = await supabase
                            .from('Atletas')
                            .select('id, nome')
                            .eq('equipa', competition.equipa_id);

                        if (athletesError) throw athletesError;

                        // Fetch existing payments and group
                        const { data: paymentsData, error: paymentsError } = await supabase
                            .from('Atletas_pagamento_torneios')
                            .select('atleta_id, valor_individual, valor_equipa')
                            .eq('competicao_id', selectedCompetitionId);

                        if (paymentsError) throw paymentsError;

                        // Group payments by athlete and initialize checkbox states
                        const groupedPayments = athletesData.reduce((acc, athlete) => {
                            const existingPayment = paymentsData.find(p => p.atleta_id === athlete.id);

                            acc[athlete.id] = {
                                valor_individual: existingPayment?.valor_individual || false,
                                valor_equipa: existingPayment?.valor_equipa || false,
                            };
                            return acc;
                        }, {});

                        setAthletes(athletesData || []);
                        setSelectedAthletePayments(groupedPayments);

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
        setSelectedAthletePayments({}); // This clear all athlete payment states
    };

    const handleAthletePaymentChange = (athleteId, paymentType, checked) => {
        setSelectedAthletePayments(prev => ({
            ...prev,
            [athleteId]: {
                ...prev[athleteId],
                [paymentType]: checked, // valor_individual or valor_equipa
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Prepare the data to be inserted into the AthleteTournamentPayments table
            const paymentsToInsert = Object.entries(selectedAthletePayments).map(([atleta_id, payment]) => ({
                atleta_id,
                competicao_id: selectedCompetitionId,
                data_pagamento,
                valor_individual: payment.valor_individual || false,
                valor_equipa: payment.valor_equipa || false
            }));

            // Insert the data into Supabase
            const { data, error } = await supabase
                .from('Atletas_pagamento_torneios')
                .insert(paymentsToInsert);

            if (error) throw error;

            console.log('Payments created successfully:', data);

            // Reset the form (clear selections after submit)
            setSelectedAthletePayments({});

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
        selectedAthletePayments,
        handleAthletePaymentChange,
        data_pagamento,
        setDataPagamento,
        handleSubmit,
        loading,
        error,
    };
};

export default useAthletePaymentForm;