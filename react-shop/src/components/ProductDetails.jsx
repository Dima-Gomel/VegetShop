import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then(res => setProduct(res.data));
  }, [id]);

  return (
    <div>
      {product && (
        <>
          <h1>{product.name}</h1>
          <img
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
            width="300"
          />
          <p>Цена: {product.price} ₽</p>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
