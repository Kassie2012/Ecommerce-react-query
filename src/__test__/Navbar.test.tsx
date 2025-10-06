import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithStore, type AppState } from '../components/test-utils';
import Navbar from '../components/Navbar';
import * as Auth from '../context/AuthContext';

describe('Navbar', () => { //tests for the navbar component
    beforeEach(() =>jest.restoreAllMocks()) //reset any mocks before each test so they don't interfere with each other

    it('Logged out: shows Register/Login; no cart badge at 0', () => {
        jest.spyOn(Auth, 'useAuth').mockReturnValue({ user: null} as any); //mock useAuth to simulate logged out user

        const pre: Partial<AppState> = { cart: { items: {} } }
        renderWithStore(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
            { preloadedState: pre as AppState }
        )

        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /shopping cart/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
        expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument(); //no badge when cart is empty
    })

    it('Logged in: shows Profile/Orders/Logout; shows cart badge with count', () => {
        jest.spyOn(Auth, 'useAuth').mockReturnValue({ user: { uid: 'u1' } } as any); //mock useAuth to simulate logged in user

        const pre: Partial<AppState> = {
            cart: {
                items: {
                    a: { id: 'a', title: 'A', price: 2, imageUrl: '', quantity: 2 },
                    b: { id: 'b', title: 'B', price: 4, imageUrl: '', quantity: 1 },
                },
            },
        }
        renderWithStore(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
            { preloadedState: pre as AppState }
        )

        expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /orders/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
        expect(screen.getByTestId('cart-badge')).toHaveTextContent('3');

    }
    )

        
})