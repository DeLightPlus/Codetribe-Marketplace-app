import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateItemQuantity, clearCart } from '../Redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <main>
        <div className="container">
        <h2>Your Cart</h2>
            <div className="cart-container">
            
            {items.length === 0 ? (
                <p>Your cart is empty. <Link to="/shop">Browse products</Link></p>
            ) : (
                <>
                <div className="cart-items">
                    {items.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.imageUrl} alt={item.name} />
                        <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>R {item.price}</p>
                        <div className="quantity">
                            <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                            <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            min="1"
                            />
                            <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <p>Total Items: {totalItems}</p>
                    <p>Total Amount: R {totalAmount}</p>
                    <button onClick={handleClearCart}>Clear Cart</button>
                    <Link to="/checkout">
                    <button>Proceed to Checkout</button>
                    </Link>
                </div>
                </>
            )}
            </div>
        </div>
    </main>
  );
};

export default Cart;
