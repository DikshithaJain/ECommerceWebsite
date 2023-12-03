import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductService from './ProductService.js';
import ProductItem from './ProductItem';


const HomePage = () => {
    
    const [products, setProducts] = useState([]);
    const [columns, setColumns] = useState('');

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
                <Link to='/users' className='Link'>Users</Link>
                <Link to='/sellers' className='Link'>Sellers</Link>
                <Link to='/orders' className='Link'>Orders</Link>
            </div>
        </div>
        <div className='products' style={style}>
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