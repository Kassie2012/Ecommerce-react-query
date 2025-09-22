import { useAuth } from '../context/AuthContext';
import EditProductModal from './EditProductModal';
import { useQueryClient } from '@tanstack/react-query';
import { confirmAndDelete } from '../types/deleteProductAction';
import type { Product } from '../types/types';
import { Rating } from '@smastrom/react-rating';
import { Card, Stack, Badge, Button } from 'react-bootstrap';
import '@smastrom/react-rating/style.css';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { addToCart, removeFromCart, changeQuantity } from '../types/cartSlice';
import type { RootState } from '../types/store';
import { useState } from 'react';


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const dispatch = useAppDispatch();
    const cartMap = useAppSelector((state: RootState) => state.cart.items);
    const quantity = cartMap[product.id]?.quantity || 0;
    const { user } = useAuth();
    const qc = useQueryClient();
    const [showEdit, setShowEdit] = useState(false)


    return (

        <Card className="h-100">
            <Card.Img
                src={product.imageUrl}
                alt={product.title}
                variant="top"
                style={{ height: 200, objectFit: 'contain' }}
                onError={(e) => {
                    e.currentTarget.onerror = null; //prevents loop
                    e.currentTarget.src= 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
                }} //uses image placeholder on 404
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-1">{product.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <Badge bg="secondary" pill className="text-uppercase">
                        {product.category}
                    </Badge>
                </Card.Subtitle>

                <Card.Text className="flex-grow-1 text-truncate" style={{ 
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' }}
                    >
                    {product.description}
                </Card.Text>

                <Stack direction="horizontal" gap={2} className="mb-2">
                    <Rating style={{ maxWidth: 150}} value={product.rating?.rate ?? 0} readOnly />
                    {product.rating?.count !=null && <small className="text-muted">
                        ({product.rating.count})</small>}
                </Stack>

                <div className="mt-2 fw-bold fs-5">${product.price.toFixed(2)}</div>

                <div className="mt-3">
                    {quantity === 0 ? (
                        <Button
                            className="w-100"
                            onClick={() => 
                                dispatch(addToCart({ 
                                    id: product.id, 
                                    title: product.title, 
                                    price: product.price, 
                                    imageUrl: product.imageUrl }))}
                            >
                                + Add to Cart
                            </Button>
                        
                    ) : (
                        <div className="d-flex align-items-center flex-column" style={{ gap: '.5rem' }}>
                           <div className="d-flex align-items-center justify-content-center" style={{ gap: '.5rem' }}>
                            <Button onClick={() => dispatch(changeQuantity({ id: product.id, quantity: quantity - 1 }))}> - </Button>
                            <div className="fs-3">{quantity}</div>
                            <Button onClick={() => dispatch(changeQuantity({ id: product.id, quantity: quantity + 1 }))}> + </Button>
                            </div> 
                            <Button variant="danger" size="sm" onClick={() => dispatch(removeFromCart(product.id))}>
                                Remove
                            </Button>
                        </div>
                    )}
                </div>

                {/*admin controls */}
                {user && (
                    <div className="mt-2 d-flex gap-2">
                        <Button variant="outline-secondary" size="sm" onClick={() => setShowEdit(true)}>
                            Edit
                        </Button>

                        <Button variant="outline-danger" size="sm" onClick={() => confirmAndDelete(qc, product.id)}>
                            Delete
                        </Button>
                    </div>
                )}

                <EditProductModal
                show={showEdit}
                onHide={() => setShowEdit(false)}
                product={product}
                />
        </Card.Body>
    </Card>
    );
};

export default ProductCard;