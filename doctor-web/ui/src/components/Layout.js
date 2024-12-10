// src/components/Layout.js

import React from 'react';
import NavBar from './navbar/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
