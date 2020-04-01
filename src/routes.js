import React from 'react';

import Main from './pages/main';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';

const routes = {
  '/main': () => <Main />,
  '/': () => <Login />,
  '/signup': () => <Signup />,
  '/profile/:id': ({ id }) => <Profile userId={id}/>
};

export default routes;