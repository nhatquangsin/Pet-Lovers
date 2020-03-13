import React from 'react';
import { useRoutes } from 'hookrouter';


import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import Routes from './routes';

function App() {
  const routeResult = useRoutes(Routes)
  return routeResult;
}

export default App;
