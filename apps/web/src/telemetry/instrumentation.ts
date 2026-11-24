import { context, propagation, trace } from '@opentelemetry/api';
import { DocumentLoadInstrumentation } from '@opentelemetry/browser-instrumentation/experimental/document-load';
import { FetchInstrumentation } from '@opentelemetry/browser-instrumentation/experimental/fetch';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchSpanProcessor, TracerProvider } from '@opentelemetry/sdk-trace';

declare global {
  interface Window {
    ghostCrmTelemetryInitialized?: boolean;
  }
}

const traceEndpoint = import.meta.env.VITE_OTEL_TRACES_ENDPOINT ?? '/otel/v1/traces';

export function initializeTelemetry() {
  if (window.ghostCrmTelemetryInitialized) {
    return;
  }

  window.ghostCrmTelemetryInitialized = true;

  const tracerProvider = new TracerProvider({
    resource: resourceFromAttributes({
      'service.name': 'ghost-crm-web',
    }),
    spanProcessors: [
      new BatchSpanProcessor({
        exporter: new OTLPTraceExporter({ url: traceEndpoint }),
        scheduledDelayMillis: 500,
      }),
    ],
  });

  trace.setGlobalTracerProvider(tracerProvider);
  context.setGlobalContextManager(new ZoneContextManager());
  propagation.setGlobalPropagator(new W3CTraceContextPropagator());

  new DocumentLoadInstrumentation().enable({ tracerProvider });
  new FetchInstrumentation({
    ignoreUrls: [/\/otel\/v1\/traces$/],
    propagateTraceHeaderCorsUrls: [/\/api\//],
  }).enable({ tracerProvider });
}
