import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import TournamentsPage from './pages/TournamentsPage';
import Layout from './Layout';
import TournamentInfo from './pages/TournamentInfo'
import PlayersList from './pages/PlayersList';
import TeamsList from './pages/TeamsList';
import TeamPage from './pages/TeamPage';
import PlayerPage from './pages/PlayerPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tournaments/:type" element={<TournamentsPage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/tournament/:id" element={<TournamentInfo />} />
        <Route path="/players" element={<PlayersList />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="/teams" element={<TeamsList />} />
        <Route path="/team/:id" element={<TeamPage />} />
      </Route>
    </Routes>)
}

export default App



