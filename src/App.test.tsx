import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock(
  'react-router-dom',
  () => {
    const react = require('react');

    const BrowserRouter = ({ children }: { children: React.ReactNode }) => <>{children}</>;
    const Route = () => null;
    const Routes = ({ children }: { children: React.ReactNode }) => {
      const routeChildren = react.Children.toArray(children) as React.ReactElement[];
      const homeRoute = routeChildren.find((route) => route.props?.path === '/');
      return <>{homeRoute?.props?.element ?? null}</>;
    };

    const Link = ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>;
    const useLocation = () => ({ pathname: '/' });

    return {
      BrowserRouter,
      Route,
      Routes,
      Link,
      useLocation,
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
