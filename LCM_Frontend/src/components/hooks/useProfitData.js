// src/components/hooks/useProfitData.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useProfitData = () => {
    const [initialBalance, setInitialBalance] = useState(0);
    const [monthlyData, setMonthlyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch initial balance
                const { data: initialBalanceData, error: initialBalanceError } = await supabase
                    .from('Entrada_Valores')
                    .select('valor')
                    .eq('type', 'initial_balance')
                    .limit(1)
                    .maybeSingle(); // Use maybeSingle()

                if (initialBalanceError) {
                    throw initialBalanceError;
                }

                setInitialBalance(initialBalanceData?.valor || 0);

                // Fetch all Entrada_Valores and Saida_Valores
                const { data: entradaData, error: entradaError } = await supabase
                    .from('Entrada_Valores')
                    .select('*');

                if (entradaError) {
                    throw entradaError;
                }

                const { data: saidaData, error: saidaError } = await supabase
                    .from('Saida_Valores')
                    .select('*');

                if (saidaError) {
                    throw saidaError;
                }

                // Calculate monthly profit
                const allMonths = [
                    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                ];

                const monthlyProfit = allMonths.map(month => {
                    const entradaForMonth = entradaData
                        .filter(item => {
                            const date = new Date(item.data_pagamento);
                            if (isNaN(date)) return false; // Check for invalid date

                            const monthIndex = date.getMonth(); // 0-indexed
                            const monthNames = [
                                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                            ];

                            return monthNames[monthIndex] === month;
                        })
                        .reduce((acc, item) => acc + item.valor, 0);

                    const saidaForMonth = saidaData
                        .filter(item => {
                            const date = new Date(item.data_pagamento);
                            if (isNaN(date)) return false; // Check for invalid date

                            const monthIndex = date.getMonth(); // 0-indexed
                            const monthNames = [
                                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                            ];

                            return monthNames[monthIndex] === month;
                        })
                        .reduce((acc, item) => acc + item.valor, 0);

                    return { month, profit: entradaForMonth - saidaForMonth };
                });

                setMonthlyData(monthlyProfit);

            } catch (error) {
                setError(error.message);
                setMonthlyData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const calculateTotalBalance = () => {
        let totalProfit = 0;
        monthlyData.forEach(month => {
            if (month.profit !== null) {
                totalProfit += month.profit;
            }
        });
        return initialBalance + totalProfit;
    };

    const totalBalance = calculateTotalBalance();

    return {
        initialBalance,
        monthlyData,
        totalBalance,
        loading,
        error
    };
};

export default useProfitData;