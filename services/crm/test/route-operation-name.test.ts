import { describe, expect, it, vi } from 'vitest';
import { getRouteTemplate, nameRouteOperation } from '../src/middleware/route-operation-name';

describe('getRouteTemplate', () => {
  it('combines the mounted router path with the matched route template', () => {
    expect(
      getRouteTemplate({
        baseUrl: '/api/events',
        route: { path: '/:eventId' },
      }),
    ).toBe('/api/events/:eventId');
  });

  it('removes trailing slash-only route templates', () => {
    expect(
      getRouteTemplate({
        baseUrl: '/api/ghosts',
        route: { path: '/' },
      }),
    ).toBe('/api/ghosts');
  });

  it('returns undefined before Express matches a route', () => {
    expect(getRouteTemplate({ baseUrl: '', route: undefined })).toBeUndefined();
  });

  it('ignores outgoing HTTP requests that do not have Express route details', () => {
    expect(getRouteTemplate({ method: 'GET' })).toBeUndefined();
  });

  it('handles the application root route', () => {
    expect(
      getRouteTemplate({
        baseUrl: '/',
        route: { path: '/' },
      }),
    ).toBe('/');
  });
});

describe('nameRouteOperation', () => {
  it('uses the stable route template as the span operation name', () => {
    const span = {
      setAttribute: vi.fn(),
      updateName: vi.fn(),
    };

    nameRouteOperation(span, 'GET', '/api/events/:eventId');

    expect(span.updateName).toHaveBeenCalledWith('GET /api/events/:eventId');
    expect(span.setAttribute).toHaveBeenCalledWith('http.route', '/api/events/:eventId');
  });
});
