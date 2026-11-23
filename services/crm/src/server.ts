import express from 'express';
import { getDemoEvent, listDemoEvents } from './events.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.get('/health', (_request, response) => {
  response.status(200).json({
    service: 'crm',
    status: 'ok',
  });
});

app.get('/api/events', (_request, response) => {
  response.status(200).json({ events: listDemoEvents() });
});

app.get('/api/events/:eventId', (request, response) => {
  const event = getDemoEvent(request.params.eventId);
  if (!event) {
    response.status(404).json({ error: 'Event not found' });
    return;
  }
  response.status(200).json({ event });
});

const server = app.listen(port, () => {
  console.info(`CRM service listening on port ${port}`);
});

const shutdown = (signal: NodeJS.Signals) => {
  console.info(`Received ${signal}; shutting down CRM service.`);
  server.close((error) => {
    if (error) {
      console.error('CRM service failed to shut down cleanly.', error);
      process.exitCode = 1;
    }
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
