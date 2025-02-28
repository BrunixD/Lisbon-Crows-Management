// src/components/Layout/TournamentTabs.jsx
import React, { useCallback } from 'react';
import Tab from './Tab';

const TournamentTabs = ({ tournaments, activeTournament, handleTournamentClick, teamName }) => {
  return (
    <div>
      <h3>Tournaments for {teamName}</h3>
      <div className="tab-container">
        {tournaments.map((tournament) => (
          <Tab
            key={tournament.id}
            label={tournament.torneio}
            isActive={activeTournament === tournament.id}
            onClick={() => handleTournamentClick(tournament.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TournamentTabs;