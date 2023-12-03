import React from 'react'
import { useEffect } from 'react'
import OrderService from '../services/OrderService';
import { useState } from 'react';
import './OrderPage.css';

const OrderPage = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        OrderService.getOrders().then((res) => {
            setOrders(res.data);
            console.log(orders);
            console.log(res.data);
        });
    }, []);

    return (
        <div>
            {orders.map(order => (
                <div className='order'>
                    <p>{order.items}</p>
                    <p>Status: {order.status}</p>
                    <p>Total: Rs. <b>{order.total}</b>/-</p>
                </div>
            ))}
        </div>
  )
}

export default OrderPage