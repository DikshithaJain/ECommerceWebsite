import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import './ProductItem.css';
import image from '../images/logo512.png'
import { useEffect } from 'react';
import { useState } from 'react';
import Star from '@mui/icons-material/Star';
import CartService from '../services/CartService';
import { useNavigate } from 'react-router-dom'


const ProductItem = ({ id, category, shortDesc, imageUrl, title, actualPrice, discount, description, quantity, rating, sellerEmail }) => {
    
    const [starsArray, setStarsArray] = useState([]);
    const [btnText, setBtnText] = useState("Add to Cart");
    const navigate = useNavigate();

    const addToCart = () => {
        if(btnText === "Go to Cart") {
            navigate('/cart');
            return
        }
        let cartProduct = {
            productId: id,
            imageSrc: imageUrl,
            productTitle: title,
            productActualPrice: actualPrice,
            productDiscount: discount,
            productQuantity: 1,
            sellerEmail: sellerEmail
        }
        CartService.addCartProduct(cartProduct)
        .then((res) => {
            setBtnText("Go to Cart");
        });
    }

    useEffect(() => {
        let rate = rating.toString();
        let rateArr = rate.split(".");
        let stars = [];
        for(let i=0; i<rateArr[0]; i++) {
            stars.push(<Star key={i}/>);
        }
        if(rateArr[1] != undefined) {
            stars.push(<StarHalfIcon />);
        }
        if(5-rating > 0) {
            let remArr = (5-rating).toString().split(".");
            for(let i=0; i<remArr[0]; i++) {
                stars.push(<StarBorderIcon key={i}/>);
            }
        }
        setStarsArray(stars);
        CartService.getCartProducts().then((res) => {
            const cart = res.data;
            for(var i = 0; i < cart.length; i++) {
                if(cart[i].productId === id) {
                    setBtnText("Go to Cart");
                }
            }
        })
    }, []);

  return (
    <div className='product'>
    <>
    <div className='product_header'>
        <img
            className='product_image'
            src={imageUrl}
            alt='' />
        <div className='product_header_options'>
            <FavoriteBorderIcon />
            <ShareIcon /> 
        </div>               
    </div>
    <div className='product_info'>
        <p className='product_title'>{title}</p>
        <div className='product_priceContainer'>
            <p className='product_ourPrice'>Rs. {(actualPrice - (actualPrice*discount)/100).toFixed(2)}</p>
            <p className='product_actualPrice'><small><del>(Rs. {actualPrice})</del></small></p>
            <p className=''><small>{discount}% discount</small></p>
        </div>
        <div className='product_rating'>
            {starsArray}
            
        </div>
        <p className='product_description'>{description}</p>
    </div>
    </>
    <button onClick={addToCart} className='product_addToCart' >{btnText}</button>    
</div>
  )
}

export default ProductItem