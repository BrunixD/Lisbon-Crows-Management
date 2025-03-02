// src/components/Forms/AthletePayment/PaymentDateInput.jsx
import React from 'react';

const PaymentDateInput = ({ data_pagamento, setDataPagamento }) => {
    return (
        <div>
            <label htmlFor="data_pagamento">Payment Date:</label>
            <input
                type="date"
                id="data_pagamento"
                className="input"
                value={data_pagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
                required
            />
        </div>
    );
};

export default PaymentDateInput;