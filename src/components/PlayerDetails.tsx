import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayer } from '../services/apiService';
import { Player } from '../types/player';
import {
    CircularProgress,
  } from '@mui/material';
  
const PlayerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    fetchPlayer(id || '');
  }, [id]);

  const fetchPlayer = async (id: string) => {
    const data = await getPlayer(id);
    setPlayer(data);
  };

  return (
    <div className='container'>
      {player ? (
        <div>
          <h1 className='capitalize'>{player.name}</h1>
          <p className='capitalize'><strong>Team:</strong> {player.team}</p>
          <p className='capitalize'><strong>Position:</strong> {player.position}</p>
          <p><strong>Jersey Number:</strong> {player.number}</p>
          {player.wikipedia && (
            <div>
              <h3>Wikipedia Information</h3>
              <div dangerouslySetInnerHTML={{ __html: player.wikipedia }} />
            </div>
          )}
        </div>
      ) : (
        <div className='spinner-container'><CircularProgress /></div>
      )}
    </div>
  );
};

export default PlayerDetails;
