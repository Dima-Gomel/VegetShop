import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {Table, Button, Pagination} from 'react-bootstrap';
import ProductFormModal from './ProductFormModal';

const AdminProductsPage = () => {
    const [products, setProducts] = useState({results: [], count: 0});
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10
    });

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.get('/api/admin/products/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                params: {
                    page: pagination.currentPage,
                    page_size: pagination.pageSize
                }
            });
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    }, [pagination.currentPage, pagination.pageSize]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/products/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            if (products.results.length === 1 && pagination.currentPage > 1) {
                setPagination(prev => ({...prev, currentPage: prev.currentPage - 1}));
            } else {
                fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    const handlePageChange = (page) => {
        setPagination(prev => ({...prev, currentPage: page}));
    };

    if (isLoading) return <div>Загрузка...</div>;

    const totalPages = Math.ceil(products.count / pagination.pageSize);

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
                {products.results.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{height: '50px'}}
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
                                    console.log("Editing product:", product);
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

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={pagination.currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                        />

                        {[...Array(totalPages).keys()].map(page => (
                            <Pagination.Item
                                key={page + 1}
                                active={page + 1 === pagination.currentPage}
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </Pagination.Item>
                        ))}

                        <Pagination.Next
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === totalPages}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(totalPages)}
                            disabled={pagination.currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            )}

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