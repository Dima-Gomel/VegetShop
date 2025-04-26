import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import './ContactsPage.css';

const ContactsPage = () => {
    const mapUrl = "https://yandex.ru/map-widget/v1/?um=constructor%3A3ab87cc5f8707d852685891d14bf61bf72a67f894a406c0d877db52c4453eb9e&amp;source=constructor\" width=\"500\" height=\"400\" frameborder=\"0\""
    return (
        <Container className="contacts-page my-5">
            <h1 className="text-center mb-5">Наши контакты</h1>

            <Row className="g-4">
                <Col lg={8}>
                    <Card className="h-100 shadow-sm">
                        <div className="map-container">
                            <iframe
                                title="Карта расположения"
                                src={mapUrl}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className="h-100 shadow-sm p-3">
                        <h3 className="mb-4">Магазин свежих овощей, фруктов и зелени "Грядка"</h3>

                        <div className="contact-item mb-3">
                            <i className="bi bi-geo-alt-fill"></i>
                            <div>
                                <h5>Адрес</h5>
                                <p>Гомель, Каменщикова, 3</p>
                            </div>
                        </div>

                        <div className="contact-item mb-3">
                            <i className="bi bi-telephone-fill"></i>
                            <div>
                                <h5>Телефон</h5>
                                <p>+375 (29) 832-25-55</p>
                            </div>
                        </div>

                        <div className="contact-item mb-3">
                            <i className="bi bi-envelope-fill"></i>
                            <div>
                                <h5>Email</h5>
                                <p>info@freshharvest.ru</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <i className="bi bi-clock-fill"></i>
                            <div>
                                <h5>Режим работы</h5>
                                <p>Вт-Вс: 9:00 - 16:00<br/>Пн: Выходной</p>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Форма обратной связи (опционально) */}
            {/*<Row className="mt-5">*/}
            {/*    <Col>*/}
            {/*        <Card className="shadow-sm p-4">*/}
            {/*            <h3 className="mb-4">Обратная связь</h3>*/}
            {/*            <form>*/}
            {/*                <div className="row g-3">*/}
            {/*                    <div className="col-md-6">*/}
            {/*                        <input type="text" className="form-control" placeholder="Ваше имя" required/>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-md-6">*/}
            {/*                        <input type="email" className="form-control" placeholder="Email" required/>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-12">*/}
            {/*                        <textarea className="form-control" rows="4" placeholder="Ваше сообщение"></textarea>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-12">*/}
            {/*                        <button type="submit" className="btn btn-primary">Отправить</button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </form>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </Container>
    );
};

export default ContactsPage;
