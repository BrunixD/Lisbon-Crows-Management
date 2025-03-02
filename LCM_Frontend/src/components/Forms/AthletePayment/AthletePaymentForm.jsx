// src/components/Forms/AthletePayment/AthletePaymentForm.jsx
import React from 'react';
import CompetitionSelect from './CompetitionSelect';
import AthletePaymentList from './AthletePaymentList';
import PaymentDateInput from './PaymentDateInput';

import useAthletePaymentForm from '../../hooks/useAthletePaymentForm';
import '../../Styles/Form.css';

const AthletePaymentForm = () => {
    const {
        competitions,
        selectedCompetitionId,
        handleCompetitionChange,
        athletes,
        selectedAthletePayments,
        handleAthletePaymentChange,
        data_pagamento,
        setDataPagamento,
        handleSubmit,
        loading,
        error,
    } = useAthletePaymentForm();

    return (
        <form className="form" onSubmit={handleSubmit}>
            <CompetitionSelect
                competitions={competitions}
                selectedCompetitionId={selectedCompetitionId}
                handleCompetitionChange={handleCompetitionChange}
            />

            <AthletePaymentList
                athletes={athletes}
                selectedAthletePayments={selectedAthletePayments}
                handleAthletePaymentChange={handleAthletePaymentChange}
            />

            <PaymentDateInput
                data_pagamento={data_pagamento}
                setDataPagamento={setDataPagamento}
            />

            <button type="submit" disabled={loading} className="button">
                {loading ? 'Creating...' : 'Register Payments'}
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default AthletePaymentForm;