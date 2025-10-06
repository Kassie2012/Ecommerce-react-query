import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithStore } from '../components/test-utils';
import Navbar from '../components/Navbar';
import * as Auth from '../context/AuthContext';
import { vi } from 'vitest';
import ProductCard from '../components/ProductCard';

vi.spyOn(Auth, 'useAuth').mockReturnValue({ user: null } as any)
vi.mock('@tanstack/react-query', () => ({
    useQueryClient: () => ({}) ,
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

describe('Integration: add to cart updates navbar badge', () => {
    it('increments badge when product added to cart', async () => {
        const user= userEvent.setup()

        renderWithStore(
            <MemoryRouter>
                <>
                <Navbar />
                <ProductCard product={product} />
                </>
            </MemoryRouter>
        )

        //hidden at start
        expect(screen.queryByTestId('cart-badge')).toBeNull();

        //add item
        await user.click(screen.getByRole('button', { name: /\+\s*add to cart/i}))

        //badge now shows 1
        expect(screen.getByTestId('cart-badge')).toHaveTextContent('1');
    })
})