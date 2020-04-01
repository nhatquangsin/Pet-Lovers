import React from 'react';
import { useRoutes } from 'hookrouter';


import './App.css';
import Main from './pages/main';
import Routes from './routes';

function App() {
  const routeResult = useRoutes(Routes)
  return routeResult;
}

export default App;
