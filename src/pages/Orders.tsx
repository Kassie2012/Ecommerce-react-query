import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchUserOrders } from '../api/orders.firestore';
import { Alert, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Order } from '../types/types';

const usd = new Intl.NumberFormat(undefined, {style: 'currency', currency: 'USD'});

export default function Orders() {
    const { user } = useAuth();

    const { data = [], isLoading, isError, error } = useQuery({
        enabled: !!user?.uid,
        queryKey: ['orders', user?.uid],
        queryFn: () => fetchUserOrders(user!.uid),
    });

    if (!user) {
        return <Alert variant="info">Please Log in to view your orders.</Alert>
    }

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    if (isError) {
        return <Alert variant='danger'>{(error as Error).message}</Alert>;
    }

    if (data.length === 0) {
        return <Alert variant="secondary">No Orders yet</Alert>
    }

    return (
        <div className="d-grid gap-3">
            {data.map((o: Order) => (
                <Card key={o.id}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="fw-bold">Order #{o.id.slice(0,8)}</div>
                            <div className="text-muted">{o.createdAt.toLocaleString()}</div>
                            {!!(o.buyerName || o.buyerEmail) && (
                                <div className='text-muted small'>Customer: {o.buyerName ?? o.buyerEmail}</div>
                            )}
                        </div>
                        <div className="fw-bold">{usd.format(o.total)}</div>
                        <Link className="btn btn-outline-primary" to={`/orders/${o.id}`}>
                        View Details
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}