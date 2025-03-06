// ProfitForm.jsx
import React, { useState } from 'react';
import './../Styles/Form.css';
import useInitialBalance from '../hooks/useInitialBalance';

const ProfitForm = () => {
  const { initialBalance, loading, error, updateInitialBalance } = useInitialBalance();
  const [newBalance, setNewBalance] = useState(initialBalance);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateInitialBalance(parseFloat(newBalance));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Initial Balance Form</h3>
      <div>
        <label htmlFor="initialBalance">Initial Balance:</label>
        <input
          type="number"
          id="initialBalance"
          className="input"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading} className="button">
        {loading ? 'Saving...' : 'Save Initial Balance'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ProfitForm;