// src/components/hooks/useInitialBalance.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useInitialBalance = () => {
    const [initialBalance, setInitialBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialBalance = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('Entrada_Valores')
                    .select('valor')
                    .eq('type', 'initial_balance')
                    .limit(1)
                    .single();

                if (error) {
                    throw error;
                }

                setInitialBalance(data?.valor || 0);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialBalance();
    }, []);

    const updateInitialBalance = async (newBalance) => {
        setLoading(true);
        setError(null);

        try {
            // Check if an initial balance record already exists
            const { data: existingBalance, error: existingBalanceError } = await supabase
                .from('Entrada_Valores')
                .select('id')
                .eq('type', 'initial_balance')
                .limit(1)
                .single();

            if (existingBalanceError) {
                throw existingBalanceError;
            }

            if (existingBalance) {
                // Update the existing record
                const { data, error } = await supabase
                    .from('Entrada_Valores')
                    .update({ valor: newBalance })
                    .eq('id', existingBalance.id)
                    .select()
                    .single();

                if (error) {
                    throw error;
                }

                setInitialBalance(data.valor);
            } else {
                // Insert a new record
                const { data, error } = await supabase.from('Entrada_Valores').insert([
                    {
                        valor: newBalance,
                        descricao: 'Initial Balance',
                        data_pagamento: new Date().toISOString().slice(0, 10), // Today's date
                        type: 'initial_balance',
                    },
                ]).select().single();

                if (error) {
                    throw error;
                }

                setInitialBalance(data.valor);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { initialBalance, loading, error, updateInitialBalance };
};

export default useInitialBalance;