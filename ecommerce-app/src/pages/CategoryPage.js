import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryService from '../services/CategoryService';
import ProductService from '../services/ProductService';
import ProductItem from '../components/ProductItem';
import product from '../services/ProductService';

const CategoryPage = () => {

    var params = useParams();
    var categoryName;
    const [subCategories, setSubCategories] = useState([]);
    const [columns, setColumns] = useState('');
    const [products, setProducts] = useState([]);

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

        categoryName = params.name;
        CategoryService.getCategories()
        .then((res) => {
            let category = (res.data).find(category => category.categoryName === categoryName)  
            setSubCategories(category.subCategories);          
        });

        getColumns();

        ProductService.getProducts().
            then((res) => {
                setProducts(res.data);
        });

    }, []);

    window.addEventListener('resize', () => {
        getColumns();
    }, true);

    const style = {
        marginLeft: '4px',
        display: 'grid',
        gridTemplateColumns: `${columns}`
    }

  return (
    <div className='' style={style}>
        {
            (products.filter(product => product.productCategory === params.name)).map(filteredProduct => <ProductItem
                key={filteredProduct.id}
                id={filteredProduct.id}
                category={filteredProduct.productCategory} 
                quantity={filteredProduct.productQuantity}
                imageUrl={filteredProduct.productImageUrl}
                title={filteredProduct.productTitle}
                actualPrice={filteredProduct.productActualPrice} 
                discount={filteredProduct.productDiscount}
                description={filteredProduct.productShortDescription}
                rating={filteredProduct.productRating}
                sellerEmail={filteredProduct.sellerEmail}
                />)
        }
        
    </div>
  )
}

export default CategoryPage