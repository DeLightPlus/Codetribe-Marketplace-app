import React, { useState } from 'react';
// import sneakersLogo from './assets/images/logo.svg';
import cartLogo from '../assets/images/icon-cart.svg';
// import avatar from './assets/images/image-avatar.png';
import productImg from '../assets/images/image-product-1.jpg';
import prodImgthumb from '../assets/images/image-product-1-thumbnail.jpg';
import prodImgthumb2 from '../assets/images/image-product-2-thumbnail.jpg';
import prodImgthumb3 from '../assets/images/image-product-3-thumbnail.jpg';
import prodImgthumb4 from '../assets/images/image-product-4-thumbnail.jpg';
import minusIcon from '../assets/images/icon-minus.svg';
import plusIcon from '../assets/images/icon-plus.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const user = useSelector((state) => state.auth.user);
    const navig = useNavigate();
    
    return ( 
        <main>{console.log("user:", user)}
            <div className="container">
                <div className='showcase'>
                    <div className="_header">
                        <div className="search-group">
                            <input type="search" placeholder="Search" />
                            {
                                !user &&
                                <button
                                    onClick={()=>{ navig("/signup") } }
                                >Get Started</button>
                            }
                        </div>
                        <div className="navbar">
                            <ul>
                                <li><a href="#">New & Featured</a></li>
                                <li><a href="#">Men</a></li>
                                <li><a href="#">Women</a></li>
                                <li><a href="#">Kids</a></li>
                            </ul>
                        </div>
                    </div>
                    <section className='productImg'>
                        
                    </section>

                    {/* <section className='thumbnails'>
                        <img src={productImg} height='500' width='500' alt="Fall Limited Edition Sneakers" />
                        <div className='thumb-image active'>
                            <img src={prodImgthumb} height='100' width='100' alt="Thumbnail 1" />
                        </div>
                        <div className='thumb-image'>
                            <img src={prodImgthumb2} height='100' width='100' alt="Thumbnail 2" />
                        </div>
                        <div className='thumb-image'>
                            <img src={prodImgthumb3} height='100' width='100' alt="Thumbnail 3" />
                        </div>
                        <div className='thumb-image'>
                            <img src={prodImgthumb4} height='100' width='100' alt="Thumbnail 4" />
                        </div>                
                    </section> */}
                </div>
            </div>

            <div className="side2" id='details'>
                <h4>SNEAKER COMPANY</h4>
                <h2>Fall Limited Edition <br /> Sneakers</h2>
                <p>
                    These low-profile sneakers are your perfect casual wear companion. 
                    Featuring a durable rubber outer sole, 
                    they’ll withstand everything the weather can offer.
                </p>

                <div className="pricing">
                    <div style={{ display: "flex" }}>  
                        <strong>$125.00</strong>
                        <div className='perc'>50%</div>
                    </div>               
                    <div><p>$250.00</p></div>
                </div> 
                
                <div className="bottomWrapper">
                    <div className="counter-wrap">
                        <button className="crementBtn" onClick={()=>{}}>
                            <img src={"minusIcon"} alt="Decrease quantity" />
                        </button> 
                        <span>{"quantity"}</span> 
                        <button className="crementBtn" onClick={()=>{}}>
                            <img src={"plusIcon"} alt="Increase quantity" />
                        </button>
                    </div> 

                    <button className="_btn" >
                        <img src={"cartLogo"} alt='Add to cart' style={{color:'black'}} width='16' height='16' />
                        Add to Cart                
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Home;