import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [selectedArmy, setSelectedArmy] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      let query = '';
      if (sortOption) {
        query += `?sortOrder=${sortOption === 'price:asc' ? 'asc' : 'desc'}`;
      }
      if (selectedArmy) {
        query += (query ? '&' : '?') + `army=${encodeURIComponent(selectedArmy)}`;
      }

      const response = await axios.get(`http://localhost:5000/api/products${query}`);
      setProducts(response.data);
    };
    fetchProducts();
  }, [sortOption, selectedArmy]);

  return (
    <div className="homepage">
      <Sidebar onArmySelect={setSelectedArmy} />

      <div className="main-content">
        <header className="title-container">
          <h1 className="home-title">Warhammer 40K Figurines</h1>
        </header>

        <div className="sort-options">
          <label style={{ color: '#ffffff' }}>Sort By: </label>
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="">None</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
          </select>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-category">Category: {product.category}</p>
              <p className="product-army">Army: {product.army}</p>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-stock">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
