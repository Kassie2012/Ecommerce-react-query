import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { selectCartItems, selectCartTotal, selectCartCount } from '../types/selector';
import { changeQuantity, removeFromCart, clearCart } from '../types/cartSlice';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Image, ListGroup, Stack, Alert } from 'react-bootstrap';

const usd = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD'});

export default function Cart() {
    const dispatch = useAppDispatch();
    const [checkout, setCheckout] = useState(false);

    //get state from store selectors
    const items = useAppSelector(selectCartItems)
    const count = useAppSelector(selectCartCount)
    const subtotal = useAppSelector(selectCartTotal)

    if (count === 0) {
        return (
            <Alert variant="info" className="d-flex justify-content-between align-items-center">
                <div>Your Cart is empty...you should add something 😏😏😜</div>
                <Button as={Link} to="/" variant="primary">Browse Products</Button>
            </Alert>
        );
    }

    const handleCheckout= () => {
        dispatch(clearCart());
        setCheckout(true);
    } 

    return (
        <>
        {checkout && (
            <Alert variant="success" className="mb-3">
                Checkout Complete! Cart Clear!
            </Alert>
        )}
        <Row className="g-4">

            {/*Items to the Left*/}

            <Col xs={12} lg={8}>
                <Card>
                    <Card.Header className="fw-bold">Shopping Cart ({count})</Card.Header>
                    <ListGroup variant="flush">
                        {items.map((item) => (
                            <ListGroup.Item key={item.id}>
                                <Row className="align-items-center g-3">
                                    <Col xs="auto">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            rounded
                                            style={{ width: 72, height: 72, objectFit: 'contain' }}
                                        />
                                    </Col>
                                    <Col>
                                        <div className="fw-semibold">{item.title}</div>
                                        <div className="text-muted small">{usd.format(item.price)}</div>
                                    </Col>
                                    <Col xs="auto">
                                        <Stack direction="horizontal" gap={2} className="justify-content-end">
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() => dispatch(changeQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                            >
                                                -
                                            </Button>
                                            <div className="px-2 fw-semibold" style={{ minWidth: 24, textAlign: 'center' }}>
                                                {item.quantity}
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() => dispatch(changeQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                            >
                                                +
                                            </Button>
                                        </Stack>
                                    </Col>
                                    <Col xs="auto">
                                        <Button
                                            size="sm"
                                            variant="outline-danger"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                        >
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </Col>

            {/*Summary to Right*/}
            <Col xs={12} lg={4}>
                <Card className="position-sticky" style={{ top: '5rem' }}>
                    <Card.Header className="fw-bold">Order Summary</Card.Header>

                    <Card.Body>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Items</span>
                            <span className="fw-semibold">{count}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span>Subtotal</span>
                            <span className="fw-bold">{usd.format(subtotal)}</span>
                        </div>

                        <div className="d-grid gap-2">
                            <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
                            <Button variant="outline-secondary" as={Link} to="/">Keep Shopping 🛒</Button>
                            <Button variant="outline-danger" onClick={() => dispatch(clearCart())}>
                                Clear Cart
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </>
    );
}