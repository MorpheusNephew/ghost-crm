import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { event, eventDetail } from './data/events';
import { ghostDetail, ghosts } from './data/ghosts';
import { overview } from './data/overview';
import { venues } from './data/venues';

export { event, eventDetail } from './data/events';
export { ghostDetail, ghosts } from './data/ghosts';
export { overview } from './data/overview';
export { venues } from './data/venues';
export const server = setupServer(
  http.get('http://localhost/api/events', () => HttpResponse.json({ events: [event] })),
  http.get('http://localhost/api/events/:eventId', ({ params }) =>
    params.eventId === event.id
      ? HttpResponse.json({ event: eventDetail })
      : HttpResponse.json({ error: 'Event not found' }, { status: 404 }),
  ),
  http.get('http://localhost/api/ghosts', () => HttpResponse.json({ ghosts })),
  http.get('http://localhost/api/ghosts/:ghostId', ({ params }) =>
    params.ghostId === ghostDetail.id
      ? HttpResponse.json({ ghost: ghostDetail })
      : HttpResponse.json({ error: 'Ghost not found' }, { status: 404 }),
  ),
  http.get('http://localhost/api/overview', () => HttpResponse.json(overview)),
  http.get('http://localhost/api/venues', () => HttpResponse.json({ venues })),
);
