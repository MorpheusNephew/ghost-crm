import express from 'express';
import { eventsRouter } from './routers/events';
import { healthRouter } from './routers/health';
import { openApiRouter } from './routers/openapi';

export function createApp() {
  const app = express();

  app.use('/health', healthRouter);
  app.use('/openapi.json', openApiRouter);
  app.use('/api/events', eventsRouter);

  return app;
}
