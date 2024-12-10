import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import signupBackground from '../../assets/images/doc_image.jpg'; // Ensure the image exists
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
// import { auth, signInWithPopup, appleProvider } from '../../firebaseConfig';
import { authGoogleSignIn, authRegister } from '../../store/slices/auth.slice';
import { ScaleLoader } from 'react-spinners';
import { ToastErrorMessage } from './../common/ToastMessageWrapper';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  // STORES FOR LOGIN..
  const { isAuthenticated, loading, error, providerLoading, isVerifyNeeded } =
    useSelector((state) => state.auth);

  const [role] = useState('doctor');

  const [formValidation, setFormValidation] = useState({
    errors: {},
    message: '',
    loading: false,
    valid: true,
  });

  // REDUX ACTIONS EFFECTS WITH LOGIN USER..
  useEffect(() => {
    if (!isAuthenticated && !loading && error?.message) {
      ToastErrorMessage({
        title: error?.message,
        message: error?.error?.message,
      });
    }

    if (
      isAuthenticated &&
      !isVerifyNeeded &&
      (!loading || !providerLoading) &&
      !error
    ) {
      navigate('/profile', { replace: true });
    }

    if (
      isAuthenticated &&
      isVerifyNeeded &&
      (!loading || !providerLoading) &&
      !error
    ) {
      navigate('/verify', { replace: true });
    }
  }, [
    isAuthenticated,
    loading,
    error,
    navigate,
    providerLoading,
    isVerifyNeeded,
  ]);

  const handleChange = (field, event) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };

  const handleValidation = () => {
    const errors = {};
    let valid = true;

    if (!user.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }
    if (!user.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    }
    if (!user.password.trim()) {
      errors.password = 'Password is required';
      valid = false;
    }

    return { valid, errors };
  };

  // HANDLE LOGIN WITH CREDENTIALS..
  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(userLogin(user, role));
    const { valid, errors } = handleValidation();

    if (!valid) {
      setFormValidation({
        ...formValidation,
        errors,
        loading: false,
        valid,
      });
      return;
    }

    setFormValidation({
      ...formValidation,
      errors: {},
      message: '',
      loading: true,
    });

    dispatch(authRegister({ ...user, role }));
  };

  // HANDLE LOGIN WITH GOOGLE PROVIDER
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      dispatch(authGoogleSignIn({ role }));
    } catch (error) {
      ToastErrorMessage({
        title: error?.message,
        message: error?.error?.message,
      });
    }
  };

  // const AppleSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, appleProvider);
  //     console.log(result.user); // User is signed in
  //   } catch (error) {
  //     console.error(error); // Handle errors here
  //   }
  // };

  return (
    <div className="signup-container">
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-lg-6 d-none d-lg-flex signup-image-container">
            <div
              className="signup-image"
              style={{ backgroundImage: `url(${signupBackground})` }}
            ></div>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="signup-form">
              <ToastContainer />
              <h1 className="text-center">Signup</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={(e) => handleChange('name', e)}
                  />
                  {formValidation.errors.name && (
                    <small className="text-danger">
                      {formValidation.errors.name}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={(e) => handleChange('email', e)}
                  />
                  {formValidation.errors.email && (
                    <small className="text-danger">
                      {formValidation.errors.email}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={(e) => handleChange('password', e)}
                  />
                  {formValidation.errors.password && (
                    <small className="text-danger">
                      {formValidation.errors.password}
                    </small>
                  )}
                </div>

                {!loading ? (
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn custom-btn-block"
                  >
                    {!loading ? 'Signup' : 'Loading...'}
                  </button>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <ScaleLoader
                      size={150}
                      color={'#18A0FB'}
                      loading={loading}
                    />
                  </div>
                )}
              </form>

              <div className="text-center mt-3">
                <span>Already have an account? </span>
                <Link to="/login">Login</Link>
              </div>

              {!providerLoading ? (
                <div className="alternative-login mt-3">
                  <button
                    className="btn btn-light mr-2"
                    onClick={handleGoogleSignIn}
                  >
                    <FontAwesomeIcon icon={faGoogle} />
                  </button>
                  <button className="btn btn-light">
                    <FontAwesomeIcon icon={faApple} />
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <ScaleLoader
                    size={50}
                    color={'#18A0FB'}
                    loading={providerLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
