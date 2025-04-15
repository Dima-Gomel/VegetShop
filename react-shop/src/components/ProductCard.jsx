import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, isLoading = false }) => {
  return (
    <Card className="product-card h-100 shadow-sm">
      <div className="product-card__image-wrapper">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="product-card__image"
        />

        {product.category && (
          <Badge pill bg="success" className="product-card__category-badge">
            {product.category}
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-card__title">{product.name}</Card.Title>

        <div className="product-card__price mb-2">
          <span className="fs-4 fw-bold text-primary">{product.price} руб</span>
          {/*{product.old_price && (*/}
          {/*  <span className="text-muted text-decoration-line-through ms-2">*/}
          {/*    {product.old_price} руб*/}
          {/*  </span>*/}
          {/*)}*/}
        </div>

        <div className="mt-auto d-flex gap-2">
          <Button
            as={Link}
            to={`/products/${product.id}`}
            variant="outline-primary"
            className="flex-grow-1"
          >
            Подробнее
          </Button>

          {onAddToCart && (
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
              disabled={isLoading}
              className="flex-grow-1"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                  <span role="status">Добавляем...</span>
                </>
              ) : (
                'В корзину'
              )}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

// Валидация props
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    old_price: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ProductCard;