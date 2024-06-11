import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';
import PlayerDetails from './components/PlayerDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PlayerList />} />
          <Route path="/players/new" element={<PlayerForm />} />
          <Route path="/players/:id/edit" element={<PlayerForm />} />
          <Route path="/players/:id" element={<PlayerDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
