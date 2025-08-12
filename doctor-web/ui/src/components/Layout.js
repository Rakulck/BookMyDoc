// src/components/Layout.js

import React, { Suspense } from 'react';
import SideBar from './sidebar/SideBar';
import TopBar from './topbar/TopBar';
import { Outlet } from 'react-router-dom';
import Loader from './common/Loader';
import './layout.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <SideBar />
      <main className="main-content">
        <TopBar />
        <div className="content-wrapper">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;
