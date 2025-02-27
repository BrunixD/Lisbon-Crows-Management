// useAthletes.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient'; // Adjust the import path if needed

const useAthletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [newAthlete, setNewAthlete] = useState({
    nome: '',
    cartao_identidade: 0,
    email: '',
    telefone: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('Atletas').select('*');
      if (error) {
        throw error;
      }
      setAthletes(data || []); // Ensure data is an array (or an empty array if null)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setNewAthlete((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateAthlete = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('Atletas').insert({
        nome: newAthlete.nome,
        cartao_identidade: parseInt(newAthlete.cartao_identidade),
        email: newAthlete.email,
        telefone: parseInt(newAthlete.telefone),
      });

      if (error) {
        throw error;
      }

      console.log('Athlete created successfully:', data);
      setNewAthlete({ nome: '', cartao_identidade: 0, email: '', telefone: 0 });
      await fetchAthletes(); // Refresh the list after creation
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    athletes,
    newAthlete,
    handleInputChange,
    handleCreateAthlete,
    loading,
    error,
  };
};

export default useAthletes;