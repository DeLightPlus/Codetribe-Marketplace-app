import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import './App.css';

import Home from './components/Home';
import ProductList from './components/shop_Products';

import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Cart from './components/cart';
import ProductPost from './components/ProductPost';
import Checkout from './components/checkout';


function App() 
{
  return (
      <div className='App'>
        
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/sell/postproduct" element={<ProductPost />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />           
          </Routes>
        
      </div> 
  )
}

export default App;