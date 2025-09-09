import { Button, Form } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/api';
import type { Category } from '../types/types';

export default function FilterBar() {
    const { selectedCategory, dispatch } = useProductContext();
    const { data: categories = [] } = useQuery({ 
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    return (
        <div className="d-flex align-items-center gap-2 mb-3">
            <Form.Select
               style= {{ maxWidth: 300 }}
               value={selectedCategory}
               onChange={(e) =>
                dispatch({ type: 'SET_SELECTED_CATEGORY', payload: e.target.value.trim() })
               }
               aria-label="Filter by Category"
               >
                <option value= "">All Categories</option>
                {categories.map((c: Category) => (
                    <option key={c} value={c}>{c}</option>
                ))}
               </Form.Select>

               <Button
                 variant="outline-secondary"
                 onClick={() => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: ''})}
                 >
                    clear
                    </Button>
        </div>
    )
}