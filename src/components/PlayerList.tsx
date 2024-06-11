import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPlayers, deletePlayer } from '../services/apiService';
import { Player } from '../types/player';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const TableHeaderCell = styled(TableCell)({
  backgroundColor: 'black',
  color: 'white',
});

const StripedTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f2f2f2',
  },
});

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayers();
  }, [search]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const data = await getPlayers(search);
      console.log(data); // Log the response to verify its structure
      if (Array.isArray(data)) {
        setPlayers(data);
      } else {
        console.error('Unexpected response format', data);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (selectedPlayerId) {
      try {
        await deletePlayer(selectedPlayerId);
        fetchPlayers();
        handleClose();
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    }
  };

  const handleClickOpen = (id: string) => {
    setSelectedPlayerId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlayerId(null);
  };

  return (
    <div className='container'>
     
      <div className='btn-add-container'>
      <h1>Basketball Players</h1>
        <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/players/new')}
            style={{ marginBottom: 16 }}
        >
            Add New Player
        </Button>
        </div>
        <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
        />
     
     
      {loading ? (
        <div className='spinner-container'><CircularProgress /></div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Team</TableHeaderCell>
                <TableHeaderCell>Position</TableHeaderCell>
                <TableHeaderCell>Number</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map(player => (
                <StripedTableRow key={player.id}>
                  <TableCell className='capitalize'>
                    <Link to={`/players/${player.id}`}>
                      {player.name}
                    </Link>
                  </TableCell>
                  <TableCell className='capitalize'>{player.team}</TableCell>
                  <TableCell className='capitalize'>{player.position}</TableCell>
                  <TableCell className='capitalize'>{player.number}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/players/${player.id}/edit`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleClickOpen(player.id!)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StripedTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Delete Player"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this player?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlayerList;
