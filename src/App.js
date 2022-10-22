import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import SingleUser from './components/SingleUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="user/:id" element={<SingleUser />} />
    </Routes>
  );
}

export default App;
