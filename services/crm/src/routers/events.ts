import { Router } from 'express';
import { getDemoEvent, listDemoEvents } from '../data/events';

export const eventsRouter = Router();

eventsRouter.get('/', (_request, response) => {
  response.status(200).json({ events: listDemoEvents() });
});

eventsRouter.get('/:eventId', (request, response) => {
  const event = getDemoEvent(request.params.eventId);
  if (!event) {
    response.status(404).json({ error: 'Event not found' });
    return;
  }
  response.status(200).json({ event });
});
