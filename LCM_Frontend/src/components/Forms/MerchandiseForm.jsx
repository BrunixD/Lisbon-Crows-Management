// components/Forms/MerchandiseForm.jsx
import React from 'react';
import useMerchandiseForm from '../hooks/useMerchandiseForm';
import '../Styles/Form.css'; // Import form styles

const MerchandiseForm = () => {
  const {
    merchandiseItems,
    athletes,
    bulkPurchases,
    handleInputChange,
    handleAddPurchase,
    handleRemovePurchase,
    handleSubmit,
    loading,
    error,
  } = useMerchandiseForm();

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Merchandise Purchase Form</h3>

      {bulkPurchases.map((purchase, index) => (
        <div key={index}>
          <label htmlFor={`merchandise_id-${index}`}>Merchandise Item:</label>
          <select
            id={`merchandise_id-${index}`}
            name="merchandise_id"
            value={purchase.merchandise_id}
            onChange={(event) => handleInputChange(index, event)}
            className="input"
            required
          >
            <option value="">Select Item</option>
            {merchandiseItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>

          <label htmlFor={`atleta_id-${index}`}>Athlete:</label>
          <select
            id={`atleta_id-${index}`}
            name="atleta_id"
            value={purchase.atleta_id}
            onChange={(event) => handleInputChange(index, event)}
            className="input"
          >
            <option value="">Select Athlete</option>
            {athletes.map((athlete) => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.nome}
              </option>
            ))}
             <option value="other">Other (Not an Athlete)</option>
          </select>

          <label htmlFor={`quantidade-${index}`}>Quantity:</label>
          <input
            type="number"
            id={`quantidade-${index}`}
            name="quantidade"
            value={purchase.quantidade}
            onChange={(event) => handleInputChange(index, event)}
            className="input"
            min="1"
            required
          />

          {bulkPurchases.length > 1 && (
            <button type="button" onClick={() => handleRemovePurchase(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddPurchase}>
        Add Purchase
      </button>

      <button type="submit" disabled={loading} className="button">
        {loading ? 'Creating...' : 'Create Purchases'}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default MerchandiseForm;