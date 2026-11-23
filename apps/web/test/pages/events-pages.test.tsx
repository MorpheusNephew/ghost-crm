import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { describe, expect, it } from 'vitest';
import { EventDetailPage } from '@/pages/EventDetailPage';
import { EventsPage } from '@/pages/EventsPage';
import { server } from '../mocks';
import { createQueryWrapper } from '../test-utils';

function Location() {
  return <p data-testid="location">{useLocation().pathname}</p>;
}

describe('event pages', () => {
  it('shows list loading then the returned event', async () => {
    render(
      <MemoryRouter>
        <EventsPage />
      </MemoryRouter>,
      { wrapper: createQueryWrapper() },
    );

    expect(screen.getByText('Loading events...')).toBeInTheDocument();
    expect(await screen.findByText("Raven's Hollow Haunted Tour")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View event' })).toHaveAttribute(
      'href',
      '/events/ravens-hollow-haunted-tour',
    );
  });

  it('shows an event-list API failure', async () => {
    server.use(
      http.get('http://localhost/api/events', () => new HttpResponse(null, { status: 500 })),
    );
    render(
      <MemoryRouter>
        <EventsPage />
      </MemoryRouter>,
      { wrapper: createQueryWrapper() },
    );

    expect(await screen.findByText('Unable to load events.')).toBeInTheDocument();
  });

  it('shows detail loading then the event roster', async () => {
    render(
      <MemoryRouter initialEntries={['/events/ravens-hollow-haunted-tour']}>
        <Routes>
          <Route path="/events/:eventId" element={<EventDetailPage />} />
        </Routes>
      </MemoryRouter>,
      { wrapper: createQueryWrapper() },
    );

    expect(screen.getByText('Loading event...')).toBeInTheDocument();
    expect(await screen.findByText('Ghost attendance')).toBeInTheDocument();
  });

  it('redirects a missing event to the event list', async () => {
    render(
      <MemoryRouter initialEntries={['/events/missing-event']}>
        <Routes>
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/events" element={<Location />} />
        </Routes>
      </MemoryRouter>,
      { wrapper: createQueryWrapper() },
    );

    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/events'));
  });
});
