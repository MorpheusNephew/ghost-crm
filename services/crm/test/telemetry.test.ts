import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getNodeAutoInstrumentations: vi.fn(),
  shutdown: vi.fn(),
  startNodeSdk: vi.fn(),
}));

vi.mock('@opentelemetry/auto-instrumentations-node', () => ({
  getNodeAutoInstrumentations: mocks.getNodeAutoInstrumentations,
}));

vi.mock('@opentelemetry/sdk-node', () => ({
  startNodeSdk: mocks.startNodeSdk,
}));

describe('telemetry', () => {
  beforeEach(() => {
    vi.resetModules();
    mocks.getNodeAutoInstrumentations.mockReset();
    mocks.shutdown.mockReset();
    mocks.startNodeSdk.mockReset();
    mocks.getNodeAutoInstrumentations.mockReturnValue([]);
    mocks.startNodeSdk.mockReturnValue({ shutdown: mocks.shutdown });
  });

  it('exports traces only and names incoming HTTP spans with route templates', async () => {
    const { shutdownTelemetry } = await import('../src/telemetry');
    const configuration = mocks.startNodeSdk.mock.calls[0]?.[0];
    const instrumentationConfiguration = mocks.getNodeAutoInstrumentations.mock.calls[0]?.[0];
    const applyCustomAttributesOnSpan =
      instrumentationConfiguration['@opentelemetry/instrumentation-http']
        .applyCustomAttributesOnSpan;
    const span = {
      setAttribute: vi.fn(),
      updateName: vi.fn(),
    };

    applyCustomAttributesOnSpan(
      span,
      {
        baseUrl: '/api/events',
        method: 'GET',
        route: { path: '/:eventId' },
      },
      {},
    );

    expect(configuration.logRecordProcessors).toEqual([]);
    expect(configuration.metricReaders).toEqual([]);
    expect(configuration.resourceDetectors).toEqual([]);
    expect(span.updateName).toHaveBeenCalledWith('GET /api/events/:eventId');
    expect(span.setAttribute).toHaveBeenCalledWith('http.route', '/api/events/:eventId');

    await shutdownTelemetry();
    expect(mocks.shutdown).toHaveBeenCalledOnce();
  });
});
