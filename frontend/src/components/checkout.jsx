import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db, collection, addDoc } from '../Firebase/config'; // Assuming Firebase is set up

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Assuming the user is logged in and their details are available in Redux
    const user = useSelector((state) => state.auth.user);

    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        items: items,
        totalAmount,
        shippingAddress,
        paymentMethod,
        userId: user ? user.uid : null,
        userEmail: user ? user.email : null,
        createdAt: new Date(),
      });

      console.log('Order placed with ID:', orderRef.id);

      // Clear cart after checkout
      // dispatch(clearCart()); // Optionally clear the cart here

      // Navigate to order confirmation page or home
      navigate(`/order-confirmation/${orderRef.id}`);
    } catch (error) {
      console.error('Error processing checkout:', error);
    }

    setLoading(false);
  };

  return (
    <main>
        <div className="checkout-container">
        <h2>Checkout</h2>
        <form onSubmit={handleCheckout}>
            <div>
            <label>Shipping Address</label>
            <input 
                type="text" 
                value={shippingAddress} 
                onChange={(e) => setShippingAddress(e.target.value)} 
                required 
            />
            </div>
            <div>
            <label>Payment Method</label>
            <input 
                type="text" 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                required 
            />
            </div>
            <div>
            <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Place Order'}
            </button>
            </div>
        </form>
        <div>
            <h3>Order Summary</h3>
            <p>Total Amount: R {totalAmount}</p>
            <p>Total Items: {items.length}</p>
        </div>
        </div>
    </main>
  );
};

export default Checkout;
