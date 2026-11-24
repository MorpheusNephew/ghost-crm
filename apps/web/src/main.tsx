import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/query-client.ts';
import './index.css';
import App from './App.tsx';

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
}

void import('./telemetry/instrumentation')
  .then(({ initializeTelemetry }) => initializeTelemetry())
  .catch((error: unknown) => {
    console.warn('Unable to initialize frontend telemetry.', error);
  })
  .finally(renderApp);
