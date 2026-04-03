import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Catalog from './Catalog';

type MockResponse = {
  ok: boolean;
  json: () => Promise<unknown>;
};

const mockFetchSequence = (...responses: unknown[]) => {
  const mockFetch = jest.fn<Promise<MockResponse>, [RequestInfo | URL]>().mockImplementation(() => {
    const nextResponse = responses.shift();
    if (nextResponse === undefined) {
      return Promise.resolve({
        ok: true,
        json: async () => [],
      });
    }

    return Promise.resolve({
      ok: true,
      json: async () => nextResponse,
    });
  });

  global.fetch = mockFetch as unknown as typeof global.fetch;
  return mockFetch;
};

describe('Catalog empty state inteligente', () => {
  const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    openSpy.mockRestore();
  });

  test('exibe sugestoes proximas e CTA de WhatsApp quando nao ha resultados', async () => {
    mockFetchSequence(
      [
        { id: 1, name: 'GM' },
        { id: 2, name: 'Volkswagen' },
      ],
      [
        { id: 1, name: 'Chave com telecomando canivete' },
      ],
      [],
      [
        {
          id: 101,
          title: 'Chave Cruze 2018',
          manufacturer: 'GM',
          type: 'Chave com telecomando canivete',
          year: 2018,
          yearRange: '2017-2019',
          price: 380,
          formattedPrice: 'R$ 380,00',
          image: '/images/chaves/automotivas/cruze.png',
          inStock: true,
        },
      ]
    );

    render(<Catalog />);

    expect(await screen.findByText('Nenhuma chave disponível no momento.')).toBeInTheDocument();
    expect(await screen.findByText('Modelos próximos que podem ajudar')).toBeInTheDocument();
    expect(await screen.findByText('Chave Cruze 2018')).toBeInTheDocument();

    const whatsappButton = screen.getByRole('button', { name: /Falar no WhatsApp/i });
    await userEvent.click(whatsappButton);

    await waitFor(() => {
      expect(window.open).toHaveBeenCalledTimes(1);
    });

    const openedUrl = (window.open as jest.Mock).mock.calls[0][0] as string;
    expect(openedUrl).toContain('wa.me/5521998063214');
    expect(decodeURIComponent(openedUrl)).toContain('Não encontrei um resultado exato no catálogo');
  });
});
