// src/components/Forms/AthletePayment/CompetitionSelect.jsx
import React from 'react';

const CompetitionSelect = ({ competitions, selectedCompetitionId, handleCompetitionChange }) => {
    return (
        <div>
            <label htmlFor="competition">Competition:</label>
            <select
                id="competition"
                className="input"
                value={selectedCompetitionId}
                onChange={handleCompetitionChange}
                required
            >
                <option value="">Select a Competition</option>
                {competitions.map((competition) => (
                    <option key={competition.id} value={competition.id}>
                        {competition.torneio} - {competition.equipa_id}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CompetitionSelect;