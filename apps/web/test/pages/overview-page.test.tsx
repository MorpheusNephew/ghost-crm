import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { OverviewPage } from '@/pages/OverviewPage';
import { server } from '../mocks';
import { createQueryWrapper } from '../test-utils';

describe('overview page', () => {
  it('shows the API-backed next event and metrics', async () => {
    render(
      <MemoryRouter>
        <OverviewPage />
      </MemoryRouter>,
      { wrapper: createQueryWrapper() },
    );

    expect(screen.getByText('Loading overview...')).toBeInTheDocument();
    expect(await screen.findByText("Raven's Hollow Haunted Tour")).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows an API failure', async () => {
    server.use(
      http.get('http://localhost/api/overview', () => new HttpResponse(null, { status: 500 })),
    );
    render(
      <MemoryRouter>
        <OverviewPage />
      </MemoryRouter>,
      { wrapper: createQueryWrapper() },
    );

    expect(await screen.findByText('Unable to load overview.')).toBeInTheDocument();
  });
});
