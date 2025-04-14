import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const ProductCard = ({product}) => {
    return (
        <Card className="product-card h-100">
            <Card.Img
                variant="top"
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                loading="lazy"
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    <span className="text-muted">{product.category}</span><br/>
                    <strong>{product.price} ₽</strong>
                </Card.Text>
                <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    variant="success"
                    className="mt-auto"
                >
                    Подробнее
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
