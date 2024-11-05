import './auth.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../../Redux/authSlice';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/config'; // Adjust import path if needed
import { useNavigate } from 'react-router-dom';

const Signin = () => {

  const navig = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // For error messages
  const [loading, setLoading] = useState(false);  // To handle loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginSuccess({ uid: user.uid, email: user.email }));
      } else {
        dispatch(logout()); // If no user is logged in, clear user from Redux
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [dispatch]);

  // Form validation
  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');  // Clear any previous errors
    return true;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) return;

    setLoading(true);  // Start loading
    dispatch(loginRequest());

    try 
    {
      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);

      dispatch(loginSuccess({uid: userCredential.user.uid, email: userCredential.user.email}));
      
      setLoading(false);  // End loading
    } catch (error) {
      setLoading(false);  // End loading
      dispatch(loginFailure(error.message));
      setError(error.message);  // Set Firebase error message
    }
  };

  if(user)
  {
    navig('/')
  }
  

  return (
    <main>
      <div className="container">
        <div className="auth-container" id="signin">
          <div className="content-group">
            <div className="content">
              <h2>Don't have an account?</h2>
              <p>Sign up to enjoy our amazing features!</p>
              <button onClick={() => { location.href = "/signup" }}>
                SIGN UP
              </button>
            </div>

            <form className="signin" onSubmit={handleSignIn}>
              <h2>SIGN IN</h2>

              {/* Google Sign-In (Placeholder) */}
              <button type="button" className="google-signin-btn">
                Sign in with Google
              </button>

              {/* Email input */}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password input */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Error Message */}
              {error && <div className="error-message">{error}</div>}

              {/* Forgot Password Link */}
              <a href="/forgot-password">Forgot Password?</a>

              {/* Submit button */}
              <button type="submit" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signin;
