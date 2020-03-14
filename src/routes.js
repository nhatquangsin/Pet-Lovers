import React from 'react';

import Main from './pages/main';
import Login from './pages/login';
import Signup from './pages/signup';

const routes = {
  '/main': () => <Main />,
  '/': () => <Login />,
  '/signup': () => <Signup />,
};

export default routes;