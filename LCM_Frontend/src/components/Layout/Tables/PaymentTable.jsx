// components/Layout/PaymentTable.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../createClient';
import PaymentTableRow from './PaymentTableRow'; // Import the new component

const PaymentTable = ({ activeTab }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from('Atletas')
          .select('nome, id, equipa (id, nome), Mensalidade (mes, data_pagamento)');

        // Apply the filter to the query
        if (activeTab === 'A' || activeTab === 'B' || activeTab === 'Feminino' || activeTab === 'Social') {
          query = query.eq('equipa.nome', activeTab); // Filter by Equipa.nome
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setPayments(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const allMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  return (
    <div>
      {loading ? (
        <p>Loading payments...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              {allMonths.map((month) => (
                <th key={month}>{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((athlete) => {
              if (athlete.equipa?.nome !== activeTab && (activeTab === 'A' || activeTab === 'B' || activeTab === 'Feminino' || activeTab === 'Social')) {
                return null; // Skip rendering this athlete
              }

              return (
                <PaymentTableRow key={athlete.id} athlete={athlete} allMonths={allMonths} />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentTable;