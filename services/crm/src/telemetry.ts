import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { startNodeSdk } from '@opentelemetry/sdk-node';
import { getRouteTemplate, nameRouteOperation } from './middleware/route-operation-name';

const telemetry = startNodeSdk({
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': {
        enabled: false,
      },
      '@opentelemetry/instrumentation-http': {
        applyCustomAttributesOnSpan: (span, request) => {
          const route = getRouteTemplate(request);

          if (route) {
            nameRouteOperation(span, request.method ?? 'GET', route);
          }
        },
      },
      '@opentelemetry/instrumentation-runtime-node': {
        enabled: false,
      },
    }),
  ],
  // This milestone exports traces only. Empty arrays prevent the SDK from
  // falling back to its default OTLP log and metrics exporters.
  logRecordProcessors: [],
  metricReaders: [],
  resourceDetectors: [],
  resourceAttributes: {
    'service.instance.id': process.env.HOSTNAME ?? 'local',
    'service.name': 'ghost-crm-crm',
  },
});

export function shutdownTelemetry() {
  return telemetry.shutdown();
}
