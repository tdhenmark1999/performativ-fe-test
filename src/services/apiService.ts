import axios from 'axios';
import { Player } from '../types/player';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getPlayers = async (search?: string) => {
  const response = await api.get('/players', {
    params: { search },
  });
  return response.data;
};

export const getPlayer = async (id: string) => {
  const response = await api.get(`/players/${id}`);
  return response.data;
};

export const createPlayer = async (player: Player) => {
  const response = await api.post('/players', player);
  return response.data;
};

export const updatePlayer = async (id: string, player: Player) => {
  const response = await api.put(`/players/${id}`, player);
  return response.data;
};

export const deletePlayer = async (id: string) => {
  const response = await api.delete(`/players/${id}`);
  return response.data;
};
