// hooks/useAthletePaymentForm.js
import { useState, useEffect, useCallback } from 'react';
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
    const [submittedPayments, setSubmittedPayments] = useState({}); // Track submitted payments

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

                        const { data: athletesData, error: athletesError } = await supabase
                            .from('Atletas')
                            .select('id, nome')
                            .eq('equipa', competition.equipa_id);

                        if (athletesError) throw athletesError;

                        const { data: paymentsData, error: paymentsError } = await supabase
                            .from('Atletas_pagamento_torneios')
                            .select('atleta_id, valor_individual, valor_equipa')
                            .eq('competicao_id', selectedCompetitionId);

                        if (paymentsError) throw paymentsError;

                        // Group payments by athlete
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

    const handleCompetitionChange = useCallback((e) => {
        setSelectedCompetitionId(e.target.value);
        setSelectedAthletePayments({});
    }, []);

    const handleAthletePaymentChange = useCallback((athleteId, paymentType, checked) => {
        setSelectedAthletePayments(prev => ({
            ...prev,
            [athleteId]: {
                ...prev[athleteId],
                [paymentType]: checked,
            }
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const paymentsToInsert = [];

            for (const athleteId of athletes.map(athlete => athlete.id)) {
                const payment = selectedAthletePayments[athleteId] || {};

                if (payment.valor_individual || payment.valor_equipa) {
                    paymentsToInsert.push({
                        atleta_id: athleteId,
                        competicao_id: selectedCompetitionId,
                        data_pagamento,
                        valor_individual: payment.valor_individual || false,
                        valor_equipa: payment.valor_equipa || false,
                    });
                }
            }

            if (paymentsToInsert.length > 0) {
                const { data, error } = await supabase
                    .from('Atletas_pagamento_torneios')
                    .insert(paymentsToInsert);

                if (error) throw error;

                console.log('Payments created successfully:', data);
                let newValuesForSubmitted = {};
                //Clear only new checkbox values as you submited and new athletes, but keep what was there!

                   paymentsToInsert.forEach(item => newValuesForSubmitted[item.atleta_id] = 1)
                setSubmittedPayments({});

            } else {
                console.log("No payments to insert.");
            }
            setDataPagamento('');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [athletes, selectedCompetitionId, selectedAthletePayments, data_pagamento, setLoading, setError]);

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
        submittedPayments,
    };
};

export default useAthletePaymentForm;