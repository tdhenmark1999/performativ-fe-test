import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PlayerForm from './PlayerForm';
import { createPlayer, getPlayer, updatePlayer } from '../services/apiService';

jest.mock('../services/apiService');

const mockCreatePlayer = createPlayer as jest.MockedFunction<typeof createPlayer>;
const mockGetPlayer = getPlayer as jest.MockedFunction<typeof getPlayer>;
const mockUpdatePlayer = updatePlayer as jest.MockedFunction<typeof updatePlayer>;

describe('PlayerForm', () => {
  it('should save input values in lowercase and display them correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/players/new']}>
          <Routes>
            <Route path="/players/new" element={<PlayerForm />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/team/i), { target: { value: 'Lakers' } });
      fireEvent.change(screen.getByLabelText(/position/i), { target: { value: 'Forward' } });
      fireEvent.change(screen.getByLabelText(/number/i), { target: { value: 0 } });
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('john doe');
      expect(screen.getByLabelText(/team/i)).toHaveValue('lakers');
      expect(screen.getByLabelText(/position/i)).toHaveValue('forward');
      expect(screen.getByLabelText(/number/i)).toHaveValue(0);
    });
  });
});
