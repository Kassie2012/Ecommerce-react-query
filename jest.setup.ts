// jest.setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Clean up the DOM after every test
afterEach(() => cleanup());

// Mock the rating component
jest.mock('@smastrom/react-rating', () => {
  const React = require('react');
  return {
    Rating: (props: any) =>
      React.createElement('div', { 'data-testid': 'rating', ...props }),
  };
});