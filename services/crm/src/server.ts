import { shutdownTelemetry } from './telemetry';

const { createApp } = await import('./app');

const app = createApp();
const port = Number(process.env.PORT ?? 3000);

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

    void shutdownTelemetry().catch((telemetryError: unknown) => {
      console.error('CRM telemetry failed to shut down cleanly.', telemetryError);
      process.exitCode = 1;
    });
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
