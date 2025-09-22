import type { Product } from '../types/types';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import { useProductContext } from '../context/ProductContext';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductsByCategory } from '../api/api.firestore';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/ProductForm';

const Home: React.FC = () => {
    const { selectedCategory } = useProductContext();
    const { user } = useAuth();

    const { 
        data: products = [], 
        isLoading, 
        isError, 
        error
     } = useQuery({
        queryKey: ['products', selectedCategory || 'all'],
        queryFn: () => 
            selectedCategory
                ? fetchProductsByCategory(selectedCategory)
                : fetchProducts(),
    }); //react query caches products; selectedCategory splits caches?

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status"/>
            </div>
        );
    }

    if (isError) {
        return (
             <Alert variant="danger" className="mt-3">
                {(error as Error).message}
            </Alert>
        );
    }
            
return (
    
    <div>
        <FilterBar />
        {user && (
            <div className="mb-3">
                <ProductForm />
            </div> //only logged in users can use
        )}

        {products.length === 0 ? (
            <Alert variant="warning">
                No products found for <strong>{selectedCategory || 'all'}</strong>.
            </Alert>
        ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
                {products.map((product: Product) => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        )}
    </div>

);

};

export default Home;