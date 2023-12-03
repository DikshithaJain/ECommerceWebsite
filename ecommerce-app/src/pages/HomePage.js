import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import CategoryItem from '../components/CategoryItem'
import image from '../images/logo512.png';
import CategoryService from '../services/CategoryService';
import './HomePage.css';

const HomePage = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        CategoryService.getCategories()
            .then((res) => {
                setCategories(res.data);
            });

    }, [categories])

    return (
        <div className='container'>
            <div className='nav'>
                <Link to='/' className='Link'>Logo here</Link>
                <div className='navbar'>
                    <Link to='/cart' className='Link'>Cart</Link>
                    <Link to='/orders' className='Link'>Orders</Link>
                    <Link to='/profile' className='Link'>Profile</Link>
                </div>
            </div>
            <div className='banner'>
                <img src={image} alt=''/>
            </div>
            <div className='categories'>
                {
                    categories.map(category => <CategoryItem image={category.imageSrc} name={category.categoryName} key={category.id}/>)
                }
                {/* <CategoryItem image={image} name='abc'/>
                <CategoryItem image={image} name='xyz'/>
                <CategoryItem image={image} name='lmn'/>
                <CategoryItem image={image} name='hij'/>
                <CategoryItem image={image} name='rst'/> */}
            </div>
        </div>
  )
}

export default HomePage