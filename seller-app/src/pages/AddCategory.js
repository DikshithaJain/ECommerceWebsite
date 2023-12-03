import React, { useEffect, useState } from 'react'
import './AddCategory.css'
import category from '../services/CategoryService';
import Modal from '@mui/material/Modal'
import { Link } from 'react-router-dom';

const AddCategory = () => {

    const [categories, setCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        category.getCategories().then((res) => {
            setCategories(res.data);
        })
    }, []);

    const addCategory = (e) => {
        e.preventDefault();
        if(categoryName && imageUrl) {
            if(!categories.find(category => category.categoryName === categoryName)) {
                let cat = {
                    categoryName: categoryName,
                    imageUrl: imageUrl
                }
                category.addCategory(cat).then((res) => {
                    category.getCategories().then((response) => {
                        setCategories(response.data)
                    })
                    setImageUrl('');
                    setCategoryName('');
                    setOpen(true);
                    setMessage('Successfully added category');
                });
            } else {
                setOpen(true);
                setMessage('Category already exists')
            }
        } else {
            setOpen(true);
            setMessage('Enter all fields');
        }
    }

  return (
    <div className='category_container'>
        <div className='nav'>
        <Link to='/' className='Link'>Logo here</Link>
        <div className='navbar'>
            <Link to='/addCategory' className='Link'>Add Category</Link>
            <Link to='/addProduct' className='Link'>Add Product</Link>
            <Link to='/orders' className='Link'>Orders</Link>
            <Link to='/profile' className='Link'>Profile</Link>
        </div>
        </div>
        <div className='existing_categories'>
            <h3>Existing Categories</h3>
            {
                categories.map(category => <li key={category.id}>{category.categoryName}</li>)
            }
        </div>
        <hr></hr>
        <div className='add_category'>
            <h3>Add Category</h3>
            <div className='form-group'>
                <label>Category Name: </label>
                <input placeholder='Category Name' name='categoryName' className='form-control' value={categoryName} onChange={e => setCategoryName(e.target.value)} required/>
            </div>
            <div className='form-group'>
                <label>Image Url: </label>
                <input placeholder='https://example.com/images/image1.jpg' name='imageUrl' className='form-control' value={imageUrl} onChange={e => setImageUrl(e.target.value)} required/>
            </div>
            <button className='btn_add_category' onClick={addCategory}>Add Category</button>
        </div>
        <hr></hr>
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
    </div>
  )
}

export default AddCategory