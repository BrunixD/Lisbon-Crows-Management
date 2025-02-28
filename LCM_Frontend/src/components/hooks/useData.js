// hooks/useData.js
import { useState, useCallback } from 'react';
import { supabase } from '../../createClient';

const useData = (initialTab) => {
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

      if (tableName === 'Todos_Pagamentos') {
        query = supabase
          .from('Todos_Pagamentos')
          .select(`
            *,
            Atletas (nome)
          `);
      }

      const { data, error } = await query;
      if (error) {
        throw error;
      }
      setData(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

export default useData;