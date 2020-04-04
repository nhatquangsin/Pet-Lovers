import React from 'react';

import Main from './pages/main';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Friends from './pages/friends';
import LikedPosts from './pages/liked-posts';

const routes = {
  '/main': () => <Main />,
  '/': () => <Login />,
  '/signup': () => <Signup />,
  '/profile/:id': ({ id }) => <Profile userId={id}/>,
  '/friends/:id': ({ id }) => <Friends userId={id}/>,
  '/liked-posts/:id': ({ id }) => <LikedPosts userId={id}/>,
};

export default routes;