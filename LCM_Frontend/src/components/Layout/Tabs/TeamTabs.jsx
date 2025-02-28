// src/components/Layout/TeamTabs.jsx
import React, { useCallback } from 'react';
import Tab from './Tab';

const TeamTabs = ({ teams, activeTeam, handleTeamClick }) => {
  return (
    <div className="tab-container">
      {teams.map((team) => (
        <Tab
          key={team.id}
          label={team.nome}
          isActive={activeTeam === team.id}
          onClick={() => handleTeamClick(team.id)}
        />
      ))}
    </div>
  );
};

export default TeamTabs;