import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { GhostsPage } from '@/pages/GhostsPage';
import { server } from '../mocks';
import { createQueryWrapper } from '../test-utils';

describe('ghost directory page', () => {
  it('shows loading then renders API-backed ghost summaries', async () => {
    render(
      <MemoryRouter>
        <GhostsPage />
      </MemoryRouter>,
      { wrapper: createQueryWrapper() },
    );

    expect(screen.getByText('Loading ghosts...')).toBeInTheDocument();
    expect(await screen.findByText('Lady Grey')).toBeInTheDocument();
    expect(screen.getByText('Estate apparition - active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('shows an API failure', async () => {
    server.use(
      http.get('http://localhost/api/ghosts', () => new HttpResponse(null, { status: 500 })),
    );
    render(
      <MemoryRouter>
        <GhostsPage />
      </MemoryRouter>,
      { wrapper: createQueryWrapper() },
    );

    expect(await screen.findByText('Unable to load ghosts.')).toBeInTheDocument();
  });
});
