import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ProductItem.css';
import image from '../images/logo512.png'
import { useEffect } from 'react';
import { useState } from 'react';
import Star from '@mui/icons-material/Star';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import Modal from '@mui/material/Modal'

const ProductItem = ({ mine, id, category, shortDesc, imageUrl, title, actualPrice, discount, description, quantity, rating }) => {
    
    const [starsArray, setStarsArray] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const [visibility, setVisibility] = useState('hidden');

    const handleClose = () => {
        setOpen(false);
      }

    // const addToCart = () => {

    // }

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
        console.log(rateArr[0]+"..."+rateArr[1]);
        if(mine) {
             setVisibility('visible');
        } else {
            setVisibility('hidden');
        }
    }, []);

    const handleEdit = () => {
        navigate('/addProduct', {state: {id, category, title, shortDesc, description, actualPrice, discount, quantity, rating, imageUrl}});
    }

    const handleDelete = () => {
        ProductService.deleteProduct(id)
        .then((res) => {
            setOpen(true);
            setMessage("Product deleted!");
        }).catch((error) => {
            console.log(error);
        }) 
    }

   const style = {
    visibility: visibility
   }
    

  return (
    <div className='product card mt-2 mr-2'>
    <>
    <div className='product_header'>
        <img
            className='product_image'
            src={imageUrl}
            alt='' />
        <div className='product_header_options' style={style}>
            <EditIcon onClick={handleEdit} />
            <DeleteIcon onClick={handleDelete} /> 
        </div>               
    </div>
    <div className='product_info'>
        <p className='product_title'>{title}</p>
        <div className='product_priceContainer'>
            <p className='product_ourPrice'>Rs. {(actualPrice - (actualPrice*discount)/100).toFixed(2)}</p>
            <p className='product_actualPrice'><small><del>(Rs. {actualPrice})</del></small></p>
            <p className='product_discount'><small>{discount}% discount</small></p>
        </div>
        <div className='product_rating'>
            {starsArray}
            
        </div>
        <p className='product_description'>{description}</p>
    </div>
    </>
    {/* <button onClick={addToCart} className='product_addToCart mt-3'>Add to Cart</button> */}
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
            minWidth: '30vw',
        }}>
            <p>{message}</p>
    </Modal>   
</div>
  )
}

export default ProductItem