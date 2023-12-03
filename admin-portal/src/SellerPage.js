import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import './SellerPage.css';
import SellerService from './SellerService';

const SellerPage = () => {

    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        SellerService.getSellers().then((res) => {
            setSellers(res.data);
        })
    }, []);

    const deleteSeller = (id) => {
        SellerService.deleteSeller(id).then((res) => {
            SellerService.getSellers().then((res) => {
                setSellers(res.data);
            })
        })
    }

    return (
        <div>
            {sellers.map(seller => (
                <div className='seller'>
                    <p>{seller.firstName}</p>
                    <p>{seller.lastName}</p>
                    <p><b>{seller.emailId}</b></p>
                    <p className='btn_delete' onClick={() => deleteSeller(seller.id)}>DELETE</p>
                </div>
            ))}
        </div>
  )
}

export default SellerPage