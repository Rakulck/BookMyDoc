// src/components/Layout.js

import React from 'react';
import SideBar from './sidebar/SideBar';
import TopBar from './topbar/TopBar';
import { Outlet } from 'react-router-dom';
import './layout.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <SideBar />
      <main className="main-content">
        <TopBar />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
