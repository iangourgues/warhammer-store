import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductSort() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products?sortOrder=${sortOrder}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [sortOrder]);

  return (
    <div className="homepage">
      <div className="title-container">
        <h1 className="home-title">Warhammer 40K Figurines</h1>
      </div>

      <div className="sort-options">
        <label>Sort By Price: </label>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-name">{product.name}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-category">Category: {product.category}</div>
            <div className="product-faction">Faction: {product.faction}</div>
            <div className="product-price">Price: ${product.price}</div>
            <div className="product-stock">Stock: {product.stock}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSort;
