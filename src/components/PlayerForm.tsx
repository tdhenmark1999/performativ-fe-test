import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPlayer, getPlayer, updatePlayer } from '../services/apiService';
import { Player } from '../types/player';
import { CircularProgress, TextField, Button, Paper, Container, Typography } from '@mui/material';
import { toLowerCase } from '../utils/formatting'; // Import the utility function

const PlayerForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player>({
    name: '',
    team: '',
    position: '',
    number: 0,
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (id) {
      fetchPlayer(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchPlayer = async (id: string) => {
    setLoading(true);
    try {
      const data = await getPlayer(id);
      setPlayer(data);
    } catch (error) {
      console.error('Error fetching player:', error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayer({ ...player, [name]: toLowerCase(value) });
    setErrors({ ...errors, [name]: '' }); 
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!player.name) newErrors.name = 'Name is required';
    if (!player.team) newErrors.team = 'Team is required';
    if (!player.position) newErrors.position = 'Position is required';
    if (player.number < 0) newErrors.number = 'Number must be greater than zero';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (id) {
        await updatePlayer(id, player);
      } else {
        await createPlayer(player);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  if (loading) {
    return <div className='spinner-container'><CircularProgress /></div>;
  }

  return (
    <Container maxWidth="sm" className='full-height-container'>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          {id ? 'Edit Player' : 'Add New Player'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={player.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Team"
            name="team"
            value={player.team}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.team}
            helperText={errors.team}
          />
          <TextField
            label="Position"
            name="position"
            value={player.position}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.position}
            helperText={errors.position}
          />
          <TextField
            label="Jersey Number"
            name="number"
            type="number"
            value={player.number}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.number}
            helperText={errors.number}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 16 }}
          >
            {id ? 'Update' : 'Add'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default PlayerForm;
