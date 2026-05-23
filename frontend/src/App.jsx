import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Panel from './pages/Panel';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/panel/*" element={<Panel />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
