// ProfitView.jsx
import React from 'react';
import './../../Styles/TabTable.css';
import useProfitData from '../../hooks/useProfitData';

const ProfitView = () => {
    const { initialBalance, monthlyData, totalBalance, loading, error } = useProfitData();

    const allMonths = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const currentMonthIndex = new Date().getMonth();

    return (
        <div>
            <h2>Profit Overview</h2>

            {loading ? (
                <p>Loading data...</p>
            ) : error ? (
                <p className="error">Error: {error}</p>
            ) : (
                <>
                    <p>Initial Balance: {initialBalance}</p>
                    <p>Total Balance: {totalBalance}</p>

                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allMonths.map((month, index) => {
                                const monthData = monthlyData.find(data => data.month === month);
                                let profit = '-';
                                if (index < currentMonthIndex) {
                                    profit = monthData ? monthData.profit : 0;
                                } else if (index === currentMonthIndex) {
                                    profit = monthData ? monthData.profit : 0;
                                }
                                return (
                                    <tr key={month}>
                                        <td>{month}</td>
                                        <td>{profit}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ProfitView;