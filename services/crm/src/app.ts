import express from 'express';
import { requestLogger } from './middleware/index';
import { eventsRouter } from './routers/events';
import { ghostsRouter } from './routers/ghosts';
import { healthRouter } from './routers/health';
import { openApiRouter } from './routers/openapi';
import { overviewRouter } from './routers/overview';
import { venuesRouter } from './routers/venues';

export function createApp() {
  const app = express();

  app.use(requestLogger);

  app.use('/health', healthRouter);
  app.use('/openapi.json', openApiRouter);
  app.use('/api/events', eventsRouter);
  app.use('/api/ghosts', ghostsRouter);
  app.use('/api/overview', overviewRouter);
  app.use('/api/venues', venuesRouter);

  return app;
}
