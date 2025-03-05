import React, { useState, useEffect } from 'react';
import Tab from './Tab';
import Table from '../Tables/Table';
import { supabase } from '../../../createClient'; // Import supabase


const InOutViewTabs = () => {
    const [activeTab, setActiveTab] = useState('In');
    const [inData, setInData] = useState([]);
    const [outData, setOutData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data: inData, error: inError } = await supabase
                    .from('Entrada_Valores')
                    .select('*');

                if (inError) throw inError;
                setInData(inData || []);

                const { data: outData, error: outError } = await supabase
                    .from('Saida_Valores')
                    .select('*');

                if (outError) throw outError;
                setOutData(outData || []);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="tab-container">
                <Tab label="In" isActive={activeTab === 'In'} onClick={() => setActiveTab('In')} />
                <Tab label="Out" isActive={activeTab === 'Out'} onClick={() => setActiveTab('Out')} />
            </div>
            <div className="content-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error">Error: {error}</p>
                ) : (activeTab === 'In' && <Table data={inData} tableName="Entrada_Valores" />) 
                || (activeTab === 'Out' && <Table data={outData} tableName="Saida_Valores" />)}
            </div>
        </div>
    );
};

export default InOutViewTabs;