import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import CartService from '../services/CartService';
import { useState } from 'react';
import './CartPage.css';
import {  } from '@mui/icons-material'
import { number } from 'prop-types';
import { checkPropTypes } from 'prop-types';
import Modal from '@mui/material/Modal'
import OrderService from '../services/OrderService';

const CartPage = () => {
    let i=0;
    let totals = [];
    let total = 0;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [cartProducts, setCartProducts] = useState([]);
    const [productQuantity, setProductQuantity] = useState(1);
    const [itemsStr, setItemsStr] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        CartService.getCartProducts().then((res) => {
            setCartProducts(res.data);
        });
    }, []);
    
    const handleClose = () => {
        setOpen(false);
    }

    const incQuantity = (id) => {
        let product = cartProducts.find(cartProduct => cartProduct.id === id);
        product.productQuantity = parseInt(product.productQuantity) + 1;
        setProductQuantity(product.productQuantity);
        // console.log(cartProducts);
    }

    const decQuantity = (id) => {
        if(productQuantity <= 1) {
            return 
        } else {
        let product = cartProducts.find(cartProduct => cartProduct.id === id);
        product.productQuantity = parseInt(product.productQuantity) - 1;
        setProductQuantity(product.productQuantity);
        // console.log(cartProducts);
        }
    }

    const removeProduct = (id) => {
        CartService.deleteCartProduct(id).then((res) => {
            CartService.getCartProducts().then((resp) => {
                setCartProducts(resp.data);
            });
        });
    }

    const placeOrder = () => {
        if (firstName && emailId && phoneNumber && address && city && state && pin) {
            if (emailId.includes('@') && emailId.includes('.') && phoneNumber.length == 10) {
                for(var i=0; i<cartProducts.length; i++) {
                    if(cartProducts[i].productQuantity > 1) {
                        CartService.updateCartProduct(cartProducts[i], cartProducts[i].id).then((res) => {CartService.getCartProducts().then((res) => {
                            // setCartProducts(res.data);
                        })});
                    }
                }
                let items = cartProducts.map(cartProduct => cartProduct.productQuantity.toString() + " " + cartProduct.productTitle);
                let item = '';
                for(let i=0; i<items.length; i++) {
                    item += items[i] + ", ";
                }
                setItemsStr(item);
                let order = {
                    firstName: firstName,
                    lastName: lastName,
                    emailId: emailId,
                    phoneNumber: phoneNumber,
                    items: item,
                    address: address,
                    city: city,
                    state: state,
                    pincode: pin,
                    total: total.toFixed(2),
                    status: 'Order Placed',
                };
                OrderService.addOrder(order).then((res) => {
                    cartProducts.map(cartProduct => CartService.deleteCartProduct(cartProduct.id).then((res) => navigate('/orders')));
                });
            } else {
                setOpen(true);
                setMessage("Please enter a valid email Id and phone number.");
            }
        } else {
            setOpen(true);
            setMessage("All fields are required to place the order.");
        }
    }

    if(cartProducts.length > 0) {
        totals = cartProducts.map(cartProduct => ((cartProduct.productActualPrice - ((cartProduct.productActualPrice * cartProduct.productDiscount)/100))* parseInt(cartProduct.productQuantity)).toFixed(2));
        for(let i=0; i<totals.length; i++)
            total += parseFloat(totals[i]);
    return (
        <div className='cartProduct'>
            <h2>Username's Cart</h2>
            <table>
                <tr>
                    <th>Sl. No.</th>
                    <th>Product Image</th>
                    <th>Product Title</th>
                    <th>Actual Price</th>
                    <th>Our Price</th>
                    <th>Quantity</th>
                    <th>Item Total</th>
                    <th>Remove</th>
                </tr>
                {cartProducts.map(cartProduct => (
                    <tr>
                        <td>{++i}</td>
                        <td><img
                            className='cartProduct_image'
                            src={cartProduct.imageSrc}
                            alt='' /></td>
                        <td>{cartProduct.productTitle}</td>
                        <td>{cartProduct.productActualPrice}</td>
                        <td>{(cartProduct.productActualPrice - ((cartProduct.productActualPrice * cartProduct.productDiscount)/100)).toFixed(2)}</td>
                        <td>
                            <div className='quantity_container'>
                                <div className='border'>
                                    <p className='btn_plus' onClick={() => incQuantity(cartProduct.id)}>+</p>
                                    <p className='quantity'>{cartProduct.productQuantity}</p>
                                    <p className='btn_minus' onClick={() => decQuantity(cartProduct.id)}>-</p>
                                </div>
                            </div>
                        </td>
                        <td>Rs. {((cartProduct.productActualPrice - ((cartProduct.productActualPrice * cartProduct.productDiscount)/100)) * cartProduct.productQuantity).toFixed(2)}</td>
                        <td style={{cursor: 'pointer'}} onClick={() => removeProduct(cartProduct.id)}>X</td>
                    </tr>
                ))}
                <tr>
                    <th colSpan={6} className='cartProduct_totalText'>Total:</th>
                    <th colSpan={2} className='cartProduct_totalPrice'>Rs. {total.toFixed(2)}</th>
                </tr>
            </table>
            {/* Address */}
            <h3>Add Delivery Address</h3>
            <form>
                <div className='form-group'>
                    <label>First Name: </label>
                    <input placeholder='First Name' name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>Last Name: </label>
                    <input placeholder='Last Name' name='lastName' value={lastName} onChange={e => setLastName(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>Email Address: </label>
                    <input placeholder='Email Address' name='emailId' value={emailId} onChange={e => setEmailId(e.target.value)} type='email' required/>
                </div>
                <div className='form-group'>
                    <label>Phone Number: </label>
                    <input placeholder='Phone Number' name='phoneNumber' type='phone' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>Address: </label>
                    <input placeholder='Address' name='address' value={address} onChange={e => setAddress(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>City: </label>
                    <input placeholder='City' name='city' value={city} onChange={e => setCity(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>State: </label>
                    <input placeholder='State' name='state' value={state} onChange={e => setState(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>Pincode: </label>
                    <input placeholder='Pincode' name='pin' value={pin} onChange={e => setPin(e.target.value)} required/>
                </div>
            </form>
            <Modal
                onClose={handleClose}
                open={open}
                style={{
                width: 100,
                height: 100,
                overflow: 'auto',
                position: 'absolute',
                backgroundColor: 'black',
                color: 'white',
                padding: '20px 10px 10px 20px',
                top: '35%',
                left: '40%',
                minWidth: '30vw'
                }}>
                <p>{message}</p>
            </Modal>
            {/* Payment Options to be added here */}
            <h3>Payment Method:</h3>
            <p>Cash on Delivery</p>
            <button className='btn_order' onClick={placeOrder}>Place Order</button>
        </div>
  );
} else {
    return (
        <h1>No Products in Cart!</h1>
    )
}
}

export default CartPage