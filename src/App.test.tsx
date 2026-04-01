import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock(
  'react-router-dom',
  () => {
    const actual = jest.requireActual('react-router-dom');

    return {
      ...actual,
      BrowserRouter: ({ children }: { children: React.ReactNode }) => (
        <actual.MemoryRouter initialEntries={['/']}>{children}</actual.MemoryRouter>
      ),
    };
  },
  { virtual: true }
);

import App from './App';

test('renderiza secoes principais da home', () => {
  render(<App />);

  expect(screen.getByText(/Chaveiro 24h - Residencial e Automotivo/i)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Início/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Chamar no WhatsApp/i }).length).toBeGreaterThan(0);
});
