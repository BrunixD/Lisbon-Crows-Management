// hooks/useMerchandiseForm.js
import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';

const useMerchandiseForm = () => {
  const [merchandiseItems, setMerchandiseItems] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [bulkPurchases, setBulkPurchases] = useState([{
    merchandise_id: '',
    atleta_id: '',
    quantidade: 1,
  }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: merchandiseData, error: merchandiseError } = await supabase
          .from('Merchandise')
          .select('id, nome');

        if (merchandiseError) throw merchandiseError;
        setMerchandiseItems(merchandiseData || []);

        const { data: athletesData, error: athletesError } = await supabase
          .from('Atletas')
          .select('id, nome');

        if (athletesError) throw athletesError;
        setAthletes(athletesData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...bulkPurchases];
    list[index][name] = value;
    setBulkPurchases(list);
  };

  const handleAddPurchase = () => {
    setBulkPurchases([...bulkPurchases, { merchandise_id: '', atleta_id: '', quantidade: 1 }]);
  };

  const handleRemovePurchase = (index) => {
    const list = [...bulkPurchases];
    list.splice(index, 1);
    setBulkPurchases(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const purchasesToInsert = bulkPurchases.map(purchase => ({
        merchandise_id: purchase.merchandise_id || null,
        atleta_id: purchase.atleta_id === 'other' ? null : purchase.atleta_id || null,
        quantidade: parseInt(purchase.quantidade, 10),
      }));

      const { data, error } = await supabase
        .from('Merchandise_Comprado')
        .insert(purchasesToInsert);

      if (error) throw error;

      console.log('Purchases created successfully:', data);
      setBulkPurchases([{ merchandise_id: '', atleta_id: '', quantidade: 1 }]); // Reset form
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    merchandiseItems,
    athletes,
    bulkPurchases,
    handleInputChange,
    handleAddPurchase,
    handleRemovePurchase,
    handleSubmit,
    loading,
    error,
  };
};

export default useMerchandiseForm;