import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { startNodeSdk } from '@opentelemetry/sdk-node';

const telemetry = startNodeSdk({
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': {
        enabled: false,
      },
      '@opentelemetry/instrumentation-runtime-node': {
        enabled: false,
      },
    }),
  ],
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
