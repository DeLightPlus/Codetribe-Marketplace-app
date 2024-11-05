import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../Redux/productSlice'; // Redux action to add product
import {  db, collection, addDoc } from '../Firebase/config';



const ProductPost = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user); // Assuming user is stored in Redux state
  // const user = firebase.auth().currentUser;

  if (!user) 
  {
    // If no user is logged in, redirect to the login page
    navigate('/signin');
    return null;
  }

  const handlePostProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add product to Firestore
      const docRef = await addDoc(collection(db, 'products'), {
        name: productName,
        description: description,
        imageUrl: imageUrl,
        price: parseFloat(price),
        userId: user.uid,      // Include user ID
        userEmail: user.email, // Include user email
      });

      // Dispatch the product to Redux store
      const newProduct = {
        id: docRef.id,
        name: productName,
        description,
        imageUrl,
        price: parseFloat(price),
        userId: user.uid,      // Store user ID in the product data
        userEmail: user.email,
      };
      dispatch(addProduct(newProduct));

      // Redirect to product list
      navigate('/shop/products');

    } catch (error) {
      console.error("Error posting product: ", error);
    }

    setLoading(false);
  };

  return (
    <main>
        <div className="container">
            <div className="product-post-form">
            <h2>Post a New Product</h2>
            <form onSubmit={handlePostProduct}>
                <div>
                <label>Product Name</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                </div>
                <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                </div>
                <div>
                <label>Image URL</label>
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
                </div>
                <div>
                <label>Price (R)</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                </div>
                <button type="submit" disabled={loading}>
                {loading ? 'Posting...' : 'Post Product'}
                </button>
            </form>
            </div>
        </div>
    </main>
  );
};

export default ProductPost;
