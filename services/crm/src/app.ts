import express from 'express';
import { eventsRouter } from './routers/events';
import { ghostsRouter } from './routers/ghosts';
import { healthRouter } from './routers/health';
import { openApiRouter } from './routers/openapi';

export function createApp() {
  const app = express();

  app.use('/health', healthRouter);
  app.use('/openapi.json', openApiRouter);
  app.use('/api/events', eventsRouter);
  app.use('/api/ghosts', ghostsRouter);

  return app;
}
