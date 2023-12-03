import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './HomePage.css';
import image from '../images/logo512.png';
import ProductItem from '../components/ProductItem';
import globalSeller from '../services/GlobalVars.js';
import ProductService from '../services/ProductService';

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const [columns, setColumns] = useState('');
    const navigate = useNavigate();

    const getColumns = () => {
        if(window.innerWidth <=400) {
            setColumns('auto');
        } else if(window.innerWidth <= 600) {
            setColumns('auto auto');
        } else if(window.innerWidth < 900) {
            setColumns('auto auto auto');
        } else if(window.innerWidth < 1200) {
            setColumns('auto auto auto auto');
        } else {
            setColumns('auto auto auto auto auto');
        }
    }

    useEffect(() => {
        if(!globalSeller.seller)
            navigate("/login");
            ProductService.getProducts().then((res) => {
                setProducts(res.data);
            });
            getColumns();
    }, []);

    window.addEventListener('resize', () => {
        getColumns();
    }, true);

    const style = {
        marginTop: '8px',
        display: 'grid',
        padding: '8px',
        gridTemplateColumns: `${columns}`
    }

  return (
    <div>
        <div className='nav'>
        <Link to='/' className='Link'>Logo here</Link>
        <div className='navbar'>
            <Link to='/addCategory' className='Link'>Add Category</Link>
            <Link to='/addProduct' className='Link'>Add Product</Link>
            <Link to='/orders' className='Link'>Orders</Link>
            <Link to='/profile' className='Link'>Profile</Link>
        </div>
        </div>
        <div className='banner'>
            <img src={image} alt='banner' style={{width: 'auto', height: '35vh', objectFit: 'cover'}}/>
        </div>
        <h3>My Products</h3>
        <div className='product_list' style={style}>
            {
                products.filter(product => product.sellerEmail === globalSeller.seller.emailId).map(product => <ProductItem 
                    mine={true}
                    key={product.id}
                    id={product.id}
                    category={product.productCategory}
                    shortDesc={product.productShortDescription}
                    imageUrl={product.productImageUrl}
                    title={product.productTitle}
                    actualPrice={product.productActualPrice}
                    discount={product.productDiscount}
                    description={product.productDescription}
                    quantity={product.productQuantity}
                    rating={product.productRating} />)
                }
        </div>
        <h3>All Products</h3>
        <div className='product_list' style={style}>
            {
                products.map(product => <ProductItem 
                    mine={false}
                    key={product.id}
                    id={product.id}
                    category={product.productCategory}
                    shortDesc={product.productShortDescription}
                    imageUrl={product.productImageUrl}
                    title={product.productTitle}
                    actualPrice={product.productActualPrice}
                    discount={product.productDiscount}
                    description={product.productDescription}
                    quantity={product.productQuantity}
                    rating={product.productRating} />)
                }
        </div>
    </div>
  )
}

export default HomePage