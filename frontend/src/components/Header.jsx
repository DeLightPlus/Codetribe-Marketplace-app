import React, { useState } from 'react';
import { FaStore, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa'; // Icons from react-icons
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import '../index.css';
import '../App.css';
import './styles.css'; // Import your CSS styles

const Header = () => {


  // Get the user state from Redux
  const user = useSelector((state) => state.auth.user);
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);


  // State for handling the dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle dropdown visibility when user clicks on user icon
  const toggleDropdown = () => 
  {
    user ? setDropdownOpen(!dropdownOpen): location.href=("/signin")
      
  };

  // Toggle mobile menu visibility when clicking the hamburger icon
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="Header">
      <div className="logo-group">
        <FaStore size={32} />
        <div className="logo">
          CodeTribe <br />
          <span>marketplace app</span>
        </div>
      </div>

      {/* Navbar for larger screens */}
      <div className="navbar">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/shop/products">Shop</Link>
          </li>
          <li className="nav-item">Blog</li>
          <li className="nav-item">Contact</li>
        </ul>

        {/* Right section with Cart and User Icon */}
        <div className="r-header-section">
          <div className="price">R{totalAmount}</div>

          <Link to={"/cart"}>
            <div className="cart-counter" style={{ display: 'flex' }}>
              <FaShoppingCart style={{ fontSize: '24px' }} />
              <div className="cart-count">{totalItems}</div>
            </div>
          </Link>

          <div className="user" onClick={toggleDropdown}>
            {user ? (
              <h2> { user.email.charAt(0).toUpperCase() } </h2>
            ) : (              
              <FaUser size={32} style={{ transform: 'translate(0px, 16px)' }} />
            )}

            {/* Dropdown Menu */}
            { (user && dropdownOpen) && (
              <div className="dropdown-menu">
                <ul>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/notifications">Notifications</Link></li>
                  <li><Link to="/sell/postproduct">Sell</Link></li>
                  <li><button onClick={() => { location.href = "/logout" }}>Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hamburger menu for mobile */}
      <div className="mobile-navbar">
        <FaBars size={32} onClick={toggleMobileMenu} />

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop/products">Shop</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/notifications">Notifications</Link></li>
              <li><Link to="/sell">Sell</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
            <FaTimes size={32} onClick={toggleMobileMenu} className="close-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
