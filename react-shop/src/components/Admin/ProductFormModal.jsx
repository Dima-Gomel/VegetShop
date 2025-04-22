import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ProductFormModal = ({ show, onHide, product, onSuccess }) => {
  // Состояния для формы
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    category: product?.category || '',
    description: product?.description || '',
    image: null
  });

  // Превью изображения
  const [preview, setPreview] = useState(product?.image || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Обработчик загрузки изображения
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, image: file});

      // Создаем превью для отображения
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (product) {
        // Редактирование существующего товара
        await axios.put(`/api/admin/products/${product.id}/`, formDataToSend, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Создание нового товара
        await axios.post('/api/admin/products/', formDataToSend, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      onSuccess(); // Обновляем список товаров
      onHide();    // Закрываем модальное окно
    } catch (err) {
      setError(err.response?.data?.message || 'Произошла ошибка при сохранении');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? 'Редактирование товара' : 'Добавление нового товара'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Название товара *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Введите название товара"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Цена *</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="Цена в рублях"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Категория *</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Овощи, Фрукты, Зелень и т.д."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Подробное описание товара"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Изображение товара</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Превью"
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              </div>
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>
            Отмена
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить товар'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
