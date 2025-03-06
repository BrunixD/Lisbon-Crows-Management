// src/components/hooks/useData.js
import { useState, useCallback } from 'react';
import { supabase } from '../../createClient';

const useData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (tableName) => {
        setLoading(true);
        setError(null);
        try {
            let query = supabase.from(tableName).select('*');

            if (tableName === 'Atletas') {
                query = supabase.from('Atletas').select('*, equipa (nome)');
            }

            if (tableName === 'Merchandise') {
                query = supabase.from('Merchandise').select('*');
            }

            if (tableName === 'Merchandise_Comprado') {
                query = supabase
                    .from('Merchandise_Comprado')
                    .select(`
            id,
            quantidade,
            Merchandise (nome),
            Atletas (nome)
          `);
            }

            if (tableName === 'Profit') {
                return; // No need to fetch data for this table
            }

            if (tableName === 'Entrada_Valores') {
                query = supabase
                    .from('Entrada_Valores')
                    .select('*');
            }

            if (tableName === 'Saida_Valores') {
                query = supabase
                    .from('Saida_Valores')
                    .select('*');
            }

            if (tableName === 'Todos_Pagamentos') {
                fetchAllPaymentsData();
                return;
            }

            const { data, error } = await query;
            if (error) {
                throw error;
            }
            setData(data || []);
            return data || []; // Return data
        } catch (error) {
            setError(error.message);
            setData([]);
            return []; // Return empty array in case of error
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAllPaymentsData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch all data sources separately
            const { data: todosPagamentosData, error: todosPagamentosError } = await supabase
                .from('Todos_Pagamentos')
                .select(`
          *,
          Atletas (nome),
          Merchandise_Comprado (
            id,
            quantidade,
            Merchandise (nome)
            )
        `);

            if (todosPagamentosError) throw todosPagamentosError;

            const { data: mensalidadeData, error: mensalidadeError } = await supabase
                .from('Mensalidade')
                .select(`
          *,
          Atletas (nome, equipa (valor_mensalidade))
        `);

            if (mensalidadeError) throw mensalidadeError;

            const { data: torneiosData, error: torneiosError } = await supabase
                .from('Atletas_pagamento_torneios')
                .select(`
          *,
          Atletas (nome),
          Competicao (torneio, valor_individual, valor_equipa)
        `);

            if (torneiosError) throw torneiosError;

            // Combine and transform data
            const combinedData = [
                ...(todosPagamentosData || []),  // Keep "other" payments
                ...(mensalidadeData || []).map(item => ({
                    ...item,
                    tipo_pagamento: 'Mensalidade',
                })),
                ...(torneiosData || []).map(item => ({
                    ...item,
                    tipo_pagamento: 'Torneio',
                })),
            ];

            setData(combinedData);
        } catch (error) {
            setError(error.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, fetchData };
};

export default useData;