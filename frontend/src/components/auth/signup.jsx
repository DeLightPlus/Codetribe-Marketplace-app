// src/pages/Signup.jsx

import './auth.css'; // Assuming you're using a CSS file for styles
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure  } from '../../Redux/authSlice';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/config';

const Signup = () => {
  const dispatch = useDispatch();
  
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // To store error messages
  const [loading, setLoading] = useState(false);  // To handle loading state

  // Form validation
  const validateForm = () => {
    if (!names || !email || !password) {
      setError('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    setError('');  // Clear any previous errors
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;  // Only proceed if validation passes

    setLoading(true);
    dispatch(loginRequest());

    try 
    {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess(userCredential.user));
      location.href="/signin";
    } 
    catch (error) {
      setLoading(false);
      dispatch(loginFailure(error.message));
      setError(error.message);  // Show Firebase error message
    }
  };

  return (
    <main>
      <div className="container">
        <div className="auth-container">
          <div className="content-group" id='signup'>
            <div className="content">
              <h2>Don't have an account?</h2>
              <p>Sign up to experience the best features of our app!</p>
              <button onClick={() => { location.href = "/signin" }}>
                SIGN IN
              </button>
            </div>

            <form className="signup" onSubmit={handleSignUp}>
              <h2>SIGN UP</h2>

              {/* Google Sign-In Button */}
              <button type="button" className="google-signin-btn">
                Sign in with Google
              </button>

              {/* Full Name Input */}
              <input
                type="text"
                placeholder="Full Name"
                value={names}
                onChange={(e) => setNames(e.target.value)}
              />

              {/* Email Input */}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password Input */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Error Message */}
              {error && <div className="error-message">{error}</div>}

              {/* Terms and Conditions Checkbox */}
              <div className="terms-checkbox">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">I agree to the Terms and Conditions</label>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
