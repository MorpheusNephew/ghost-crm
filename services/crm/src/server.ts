import express from 'express';
import { eventsRouter } from './routers/events.js';
import { healthRouter } from './routers/health.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use('/health', healthRouter);
app.use('/api/events', eventsRouter);

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
