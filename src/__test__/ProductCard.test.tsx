import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithStore } from '../components/test-utils';
import ProductCard from '../components/ProductCard';
import * as Auth from '../context/AuthContext';
import { vi } from 'vitest';

//keep admin controls hidden
vi.spyOn(Auth, 'useAuth').mockReturnValue({ user: null, } as any);

//avoid wiring real client provider
vi.mock('@tanstack/react-query', () => ({
    useQueryClient: () => ({}) 
}))

const product = {
    id: 'p1',
    title: 'tshirt 1',
    price: 19.99,
    imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg',
    category: 'clothing',
    description: 'A cool tshirt',
    rating: { rate: 4.5, count: 10 }
} as const;

describe('ProductCard', () => {
    it('renders and toggles add -> quantity 1', async () => {
        const user = userEvent.setup()
        renderWithStore(<ProductCard product={product} />)

        expect(screen.getByText(/tshirt 1/i)).toBeInTheDocument();
        expect(screen.getByText(/\$19\.99/)).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /\+\s*add to cart/i}))
        expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('increments, decrements, and removes from cart', async () => {
        const user= userEvent.setup()
        renderWithStore(<ProductCard product={product} />)
        
        await user.click(screen.getByRole('button', { name: /\+\s*add to cart/i}))

        const minus = screen.getByRole('button', { name: /^\s*-\s*$/  })
        const plus = screen.getByRole('button', { name: /^\s*\+\s*$/  })

        await user.click(plus)
        expect(screen.getByText('2')).toBeInTheDocument()

        await user.click(minus)
        expect(screen.getByText('1')).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: /remove/i }))
        expect(screen.getByRole('button', { name: /\+\s*add to cart/i})).toBeInTheDocument()
    })       
})