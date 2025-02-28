// src/components/Layout/CompetitionViewTabs.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../createClient';
import CompetitionPaymentCheck from '../CompetitionPaymentCheck';
import TeamTabs from './TeamTabs';
import TournamentTabs from './TournamentTabs';

const CompetitionViewTabs = () => {
    const [teams, setTeams] = useState([]);
    const [activeTeam, setActiveTeam] = useState(null);
    const [tournaments, setTournaments] = useState([]);
    const [activeTournament, setActiveTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('Equipa')
                    .select('id, nome');

                if (error) {
                    throw error;
                }

                setTeams(data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        const fetchTournaments = async () => {
            if (activeTeam) {
                setLoading(true);
                setError(null);
                try {
                    const { data, error } = await supabase
                        .from('Competicao')
                        .select('id, torneio')
                        .eq('equipa_id', activeTeam);

                    if (error) {
                        throw error;
                    }

                    setTournaments(data || []);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchTournaments();
    }, [activeTeam]);

    const handleTeamClick = useCallback((teamId) => {
        setActiveTeam(teamId);
        setActiveTournament(null); // Reset tournament selection
    }, []);

    const handleTournamentClick = useCallback((tournamentId) => {
        setActiveTournament(tournamentId);
    }, []);

    const teamName = teams.find(team => team.id === activeTeam)?.nome;

    return (
        <div>
            <h2>Competition Payments</h2>

            {/* Team Tabs */}
            <TeamTabs
                teams={teams}
                activeTeam={activeTeam}
                handleTeamClick={handleTeamClick}
            />

            {/* Tournament Tabs (Conditional Rendering) */}
            {activeTeam && (
                <TournamentTabs
                    tournaments={tournaments}
                    activeTournament={activeTournament}
                    handleTournamentClick={handleTournamentClick}
                    teamName={teamName}
                />
            )}

            {/* Payment Check (Conditional Rendering) */}
            {activeTournament && (
                <div>
                    <CompetitionPaymentCheck teamId={activeTeam} tournamentId={activeTournament} />
                </div>
            )}

            {loading && <p>Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
        </div>
    );
};

export default CompetitionViewTabs;