import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { event, eventDetail } from './data/events';
import { ghosts } from './data/ghosts';

export { event, eventDetail } from './data/events';
export { ghosts } from './data/ghosts';
export const server = setupServer(
  http.get('http://localhost/api/events', () => HttpResponse.json({ events: [event] })),
  http.get('http://localhost/api/events/:eventId', ({ params }) =>
    params.eventId === event.id
      ? HttpResponse.json({ event: eventDetail })
      : HttpResponse.json({ error: 'Event not found' }, { status: 404 }),
  ),
  http.get('http://localhost/api/ghosts', () => HttpResponse.json({ ghosts })),
);
