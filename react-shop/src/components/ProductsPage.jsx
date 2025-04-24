import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Row, Col, Spinner, Pagination, Form, Button} from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductsPage = () => {
  const [data, setData] = useState({
    products: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 8,
    totalItems: 0
  });

  const fetchProducts = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      const response = await axios.get(`http://localhost:8000/api/products/`, {
        params: {
          page: data.currentPage,
          page_size: data.itemsPerPage
        }
      });

      setData(prev => ({
        ...prev,
        products: response.data.results || response.data, // Поддержка обоих форматов
        totalItems: response.data.count || response.data.length,
        totalPages: Math.ceil(
          (response.data.count || response.data.length) / data.itemsPerPage
        ),
        loading: false
      }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        error: error.response?.data?.detail || error.message,
        loading: false,
        products: []
      }));
      console.error('Ошибка загрузки:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [data.currentPage, data.itemsPerPage]);

  const handlePageChange = (page) => {
    setData(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (e) => {
    setData(prev => ({
      ...prev,
      itemsPerPage: Number(e.target.value),
      currentPage: 1  // Сбрасываем на первую страницу
    }));
  };

  if (data.loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Загрузка товаров...</p>
    </Container>
  );

  if (data.error) return (
    <Container className="py-5 text-center text-danger">
      <h2>Ошибка</h2>
      <p>{data.error}</p>
      <Button variant="outline-primary" onClick={fetchProducts}>
        Повторить попытку
      </Button>
    </Container>
  );

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Каталог товаров</h1>
        <div className="d-flex align-items-center">
          <span className="me-2">Товаров:</span>
          <Form.Select
            size="sm"
            style={{ width: '80px' }}
            value={data.itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="24">24</option>
          </Form.Select>
        </div>
      </div>

      {data.products.length > 0 ? (
        <>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {data.products.map(product => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {data.totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination>
                <Pagination.First
                  disabled={data.currentPage === 1}
                  onClick={() => handlePageChange(1)}
                />
                <Pagination.Prev
                  disabled={data.currentPage === 1}
                  onClick={() => handlePageChange(data.currentPage - 1)}
                />

                {Array.from({ length: Math.min(5, data.totalPages) }).map((_, idx) => {
                  let pageNum;
                  if (data.totalPages <= 5) {
                    pageNum = idx + 1;
                  } else if (data.currentPage <= 3) {
                    pageNum = idx + 1;
                  } else if (data.currentPage >= data.totalPages - 2) {
                    pageNum = data.totalPages - 4 + idx;
                  } else {
                    pageNum = data.currentPage - 2 + idx;
                  }

                  return (
                    <Pagination.Item
                      key={pageNum}
                      active={pageNum === data.currentPage}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Pagination.Item>
                  );
                })}

                <Pagination.Next
                  disabled={data.currentPage === data.totalPages}
                  onClick={() => handlePageChange(data.currentPage + 1)}
                />
                <Pagination.Last
                  disabled={data.currentPage === data.totalPages}
                  onClick={() => handlePageChange(data.totalPages)}
                />
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <h3>Товары не найдены</h3>
          <p>Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </Container>
  );
};

export default ProductsPage;
