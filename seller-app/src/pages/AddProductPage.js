import React, { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import CategoryService from '../services/CategoryService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import category from '../services/CategoryService';
import './AddProductPage.css';
import GlobalVars from '../services/GlobalVars';
import Modal from '@mui/material/Modal'

const AddProductPage = () => {

    const [categories, setCategories] = useState([]);

    const [productId, setProductId] = useState();
    const [productCategory, setProductCategory] = useState("Select Category");
    const [productTitle, setProductTitle] = useState("");
    const [productShortDescription, setProductShortDescription] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productActualPrice, setProductActualPrice] = useState(0);
    const [productDiscount, setProductDiscount] = useState(0);
    const [productRating, setProductRating] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);
    const [productImageUrl, setProductImageUrl] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [pageType, setPageType] = useState('Add Product');
    const navigate = useNavigate();
    const state = useLocation();

    const handleClose = () => {
        setOpen(false);
      }

    useEffect(() => {
        console.log(state.state);
        if (state.state) {
            setProductId(state.state.id);
            setProductCategory(state.state.category);
            setProductTitle(state.state.title);
            setProductShortDescription(state.state.shortDesc);
            setProductDescription(state.state.description);
            setProductActualPrice(state.state.actualPrice);
            setProductDiscount(state.state.discount);
            setProductRating(state.state.rating);
            setProductQuantity(state.state.quantity);
            setProductImageUrl(state.state.imageUrl);
            setPageType('Update Product')
            let dropdown = document.getElementById('dropdown');
            console.log(dropdown.options)
            for(var i = 0; i < dropdown.options.length; i++) {
                if(dropdown.options[i].text === state.state.category) {
                    dropdown.options[i].selected = true;
                    setProductCategory(dropdown.options[i].text);
                }
            }
        } 
        CategoryService.getCategories()
            .then((res) => {
                setCategories(res.data);
            });
    }, []);

    const addProduct = (e) => {
        e.preventDefault();
        console.log(productCategory);
        if(productCategory && productTitle && productShortDescription && productDescription && productActualPrice && productDiscount && productRating && productQuantity && productImageUrl) {
            let product = {
                productCategory: productCategory,
                productTitle: productTitle,
                productShortDescription: productShortDescription,
                productDescription: productDescription,
                productActualPrice: productActualPrice,
                productDiscount: productDiscount,
                productRating: productRating,
                productQuantity: productQuantity,
                productImageUrl: productImageUrl,
                sellerEmail: GlobalVars.seller.emailId
            }
            if(pageType === 'Add Product') {
                ProductService.createProduct(product)
                    .then((res) => {
                        navigate('/');
                    })
                    .catch((error) => {
                        setOpen(true);
                        setMessage(error);
                    });
            } else {
                ProductService.updateProduct(product, productId)
                    .then((res) => {
                        navigate('/');
                    })
                    .catch((error) => {
                        setOpen(true);
                        setMessage(error);
                    });
            }
        } else {
            setOpen(true);
            setMessage("All the fields are required to create/update a product!");
        }
    }

  return (
        <div className='add_product_container'>
            <div className='nav'>
        <Link to='/' className='Link'>Logo here</Link>
        <div className='navbar'>
            <Link to='/addCategory' className='Link'>Add Category</Link>
            <Link to='/addProduct' className='Link'>Add Product</Link>
            <Link to='/orders' className='Link'>Orders</Link>
            <Link to='/profile' className='Link'>Profile</Link>
        </div>
        </div>
            <h3>{pageType}</h3>
                <form>
                    <div className='form_group'>
                        <label>Product Category: </label>
                        <select id="dropdown" onChange={(e) => {setProductCategory(e.target.value)}} defaultValue="Select">
                            {
                                <option disabled value={"Select"}>{productCategory}</option>
                            }
                            {
                                categories.map(category => <option key={category.id} value={category.categoryName}>{category.categoryName}</option>)
                            }
                        </select>
                    </div>
                    <div className='form_group'>
                        <label>Product Title: </label>
                        <input placeholder='Product Title' name='productTitle' value={productTitle} onChange={e => setProductTitle(e.target.value)} required/>
                    </div>
                    <div className='form_group'>
                        <label>Product Short Description: </label>
                        <input placeholder='Product Short Description' name='productShortDescription' value={productShortDescription} onChange={e => setProductShortDescription(e.target.value)} required/>
                    </div>
                    <div className='form_group'>
                        <label>Product Description: </label>
                        <input placeholder='Product Description' name='productDescription' value={productDescription} onChange={e => setProductDescription(e.target.value)} required/>
                    </div>
                    <div className='form_group'>
                        <label>Product Actual Price: </label>
                        <input placeholder='Product Actual Price' name='productActualPrice' type='number' value={productActualPrice} onChange={e => setProductActualPrice(e.target.value)} required/>
                    </div>
                    <div className='form_group'>
                        <label>Product Discount: </label>
                        <input placeholder='Product Discount' name='productDiscount' type='number' value={productDiscount} onChange={e => setProductDiscount(e.target.value)} required/>
                    </div>
                    <div className='form_group'>
                        <label>Product Rating: </label>
                        <input placeholder='Product Rating' name='productRating' type='number' value={productRating} onChange={e => setProductRating(e.target.value)} required/>
                    </div>
                    <div className='form_group'>
                        <label>Product Quantity: </label>
                        <input placeholder='Product Quantity' name='productQuantity' type='number' value={productQuantity} onChange={e => setProductQuantity(e.target.value)} required/>
                    </div>
                    <div className='form_group'>
                        <label>Product Image Url: </label>
                        <input placeholder='Product Image Url' name='productImageUrl' value={productImageUrl} onChange={e => setProductImageUrl(e.target.value)} required/>
                    </div>
                    <button className='btn_add_product' onClick={addProduct}>{pageType}</button>
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
                    minWidth: '30vw',
                }}>
                    <p>{message}</p>
                </Modal>
        </div>
  )
}

export default AddProductPage