import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { setProducts } from '../Redux/productSlice'; // Action to update the Redux store
import { db, collection, getDocs } from '../Firebase/config'; // Firebase configuration

import { FaShoppingCart } from 'react-icons/fa';
import { FaExpand } from 'react-icons/fa';

const ProductList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Get the products from the Redux store
  
  // Get products from Redux store
  const products = useSelector((state) => state.product.products);
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
  
  // Fetch products from Firestore and store them in Redux state
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Include Firestore document ID
      }));
      dispatch(setProducts(productList)); // Store products in Redux state
    };

    fetchProducts();
  }, [dispatch]);

  // Handle adding product to the cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If the item already exists, update the quantity instead of adding a duplicate
      dispatch(addToCart({ ...product, quantity: existingItem.quantity + 1 }));
    } else {
      // Add new item with quantity 1 if it's not in the cart
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <main>
      <div className="container">
        <div className="products-header">
          <p><strong>Home</strong>/Products</p>
          <div>
            <h2>Shop</h2>
            <input type="text" placeholder="Search products" />
          </div>
          <div>
            <small>showing 1 of {products.length} results</small>
            <select>
              <option value="">Default</option>
            </select>
          </div>
        </div>

        <div className="product-list">
          {
            products.map((product) => (
              <div className="product-item" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>

                <div>
                  <button 
                    onClick={() => console.log('Maximise product details')} 
                    className="_maximise_btn"
                  >
                    <FaExpand size={16} />
                  </button>

                  <span>${product.price}</span>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="_addToCart_btn"
                    disabled={cartItems.some((item) => item.id === product.id)}
                  >
                    <FaShoppingCart size={15} style={{ marginRight: '8px' }} />
                    {cartItems.some((item) => item.id === product.id)}
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
};

export default ProductList;
