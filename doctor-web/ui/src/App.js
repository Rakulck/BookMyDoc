import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import Logout from './components/Logout';
import LoginPage from './components/login/Login';
import Signup from './components/signup/Signup';
import ProtectedRoute from './lib/ProtectedRoute';
import ForgotPassword from './components/login/ForgotPassword';
import Verify from './components/Verify';

const Profile = React.lazy(() => import('./components/profile/Profile'));
const Availability = React.lazy(
  () => import('./components/availability/Availability'),
);
const Bookings = React.lazy(() => import('./components/bookings/Bookings'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage> </LoginPage>} />
        <Route path="/signup" element={<Signup> </Signup>} />

        <Route
          path="/forgotPassword"
          element={<ForgotPassword> </ForgotPassword>}
        />

        <Route path="/verify" element={<Verify />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="/availability"
            element={
              <ProtectedRoute>
                <Availability />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={<ProtectedRoute element={<Logout />} />}
          />
          <Route
            path="/"
            element={<ProtectedRoute element={<Availability />} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
