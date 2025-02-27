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
        // Fetch team name with the id
        query = supabase.from('Atletas').select('*, equipa (nome)'); //  name of related table
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