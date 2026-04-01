import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock(
  'react-router-dom',
  () => ({
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Route: ({ element }: { element: React.ReactElement }) => element,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
    useLocation: () => ({ pathname: '/' }),
  }),
  { virtual: true }
);

import App from './App';

test('renderiza secoes principais da home', () => {
  render(<App />);

  expect(screen.getByText(/Chaveiro 24h - Residencial e Automotivo/i)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Início/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Chamar no WhatsApp/i }).length).toBeGreaterThan(0);
});
