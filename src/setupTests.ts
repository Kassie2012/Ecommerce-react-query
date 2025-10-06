import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

//cleanup after each test
afterEach(() => cleanup())

//mocking the rating component since it uses canvas
vi.mock('@smastrom/react-rating', () => {
    return {
        Rating: (props: any) =>
            React.createElement('div', { 'data-testid': 'rating', ...props }),
    }
})