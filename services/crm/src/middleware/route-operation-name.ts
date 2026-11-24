import type { Span } from '@opentelemetry/api';

type RouteRequest = {
  baseUrl?: unknown;
  route?: {
    path?: unknown;
  };
};

export function getRouteTemplate(request: unknown) {
  if (!isRouteRequest(request)) {
    return undefined;
  }

  const routePath = request.route?.path;

  if (typeof request.baseUrl !== 'string' || typeof routePath !== 'string') {
    return undefined;
  }

  const baseUrl = request.baseUrl === '/' ? '' : request.baseUrl;
  const path = routePath === '/' ? '' : routePath;

  return `${baseUrl}${path}` || '/';
}

function isRouteRequest(request: unknown): request is RouteRequest {
  return typeof request === 'object' && request !== null;
}

export function nameRouteOperation(
  span: Pick<Span, 'setAttribute' | 'updateName'>,
  method: string,
  route: string,
) {
  span.updateName(`${method} ${route}`);
  span.setAttribute('http.route', route);
}
