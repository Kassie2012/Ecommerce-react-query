import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrder } from '../api/orders.firestore';
import { Alert, Card, ListGroup, Spinner } from 'react-bootstrap';
import type { Order } from '../types/types';

const usd = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD'});

export default function OrdersDetails() {
    const { id = '' } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['orders', id],
        queryFn: () => fetchOrder(id),
    });

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    if (isError) return <Alert variant="danger">{(error as Error).message}</Alert>;
    if (!data) return <Alert variant="warnng">Order Not Fount</Alert>;

    const order = data as Order;

    return (
        <div className="d-grid gap-3">
            <Link to="/orders" className="btn btn-outline-secondary">Back to orders</Link>
            <Card>
                <Card.Header>
                    <div className="fw-bold">Order #{order.id}</div>
                    <div className="text-muted">{order.createdAt.toLocaleString()}</div>
                    {!!(order.buyerName || order.buyerEmail) && (
                        <div className='text-muted small'>Customer: {order.buyerName ?? order.buyerEmail}</div>
                    )}

                </Card.Header>
                <ListGroup variant='flush'>
                    {order.items.map((it) => (
                        <ListGroup.Item key={it.id} className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <img src={it.imageUrl} alt={it.title} style={{ width: 56, height: 56, objectFit: "contain"}} />
                                <div>
                                    <div className='fw-semibold'>{it.title}</div>
                                    <small className='text-muted'>{it.quantity}</small>
                                </div>
                            </div>
                            <div className='fw-semibold'>{usd.format(it.price * it.quantity)}</div>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item className="d-flex justify-content-between">
                        <div className="fw-bold">Total</div>
                        <div className="fw-bold">{usd.format(order.total)}</div>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}