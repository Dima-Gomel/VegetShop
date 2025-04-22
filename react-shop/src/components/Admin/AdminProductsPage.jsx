import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import ProductFormModal from './ProductFormModal';

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get('/api/admin/products/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/products/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    if (isLoading) return <div>Загрузка...</div>;

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>Управление товарами</h2>
                <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                >
                    Добавить товар
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Категория</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ height: '50px' }}
                                    />
                                )}
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price} ₽</td>
                            <td>{product.category}</td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => {
                                        setEditingProduct(product);
                                        setShowModal(true);
                                    }}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="ms-2"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ProductFormModal
                show={showModal}
                onHide={handleModalClose}
                product={editingProduct}
                onSuccess={() => {
                    fetchProducts();
                    handleModalClose();
                }}
            />
        </div>
    );
};

export default AdminProductsPage;
