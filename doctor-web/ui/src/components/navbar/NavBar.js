import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../store/slices/auth.slice';

const NavBar = () => {
  const isAuthenticated = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      unwrapResult(await dispatch(authLogout()));
      navigate('/login');
    }
  };

  return (
    <div id="navbar">
      <Navbar expand="lg">
        <Navbar.Brand className="brand" as={NavLink} to="/">
          Doctor Appointment
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/availability" activeClassName="active">
              Availability
            </Nav.Link>
            <Nav.Link as={NavLink} to="/bookings" activeClassName="active">
              Bookings
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile" activeClassName="active">
              Profile
            </Nav.Link>
            {!isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/login" activeClassName="active">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup" activeClassName="active">
                  Signup
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/" onClick={handleLogout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
