import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CategoryItem.css'

const CategoryItem = ({image, name='Item'}) => {

    const navigate = useNavigate();

    return (
        <div className='category-item' onClick={() => {navigate('/categories/'+name)}} >
            <div className='card'>
                <img src={image} alt='' width={75} height={75}/>
            </div>
            <h5>{name}</h5>
        </div>
    )
}

export default CategoryItem