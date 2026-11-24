import { randomUUID } from 'node:crypto';
import pinoHttp from 'pino-http';

export const requestLogger = pinoHttp({
  autoLogging: {
    ignore: (request) => request.url === '/health',
  },
  base: {
    instance: process.env.HOSTNAME ?? 'local',
    service: 'crm',
  },
  enabled: process.env.NODE_ENV !== 'test',
  genReqId: (request, response) => {
    const requestId = request.headers['x-request-id'];

    if (typeof requestId === 'string' && requestId.length > 0) {
      response.setHeader('x-request-id', requestId);
      return requestId;
    }

    const generatedRequestId = randomUUID();
    response.setHeader('x-request-id', generatedRequestId);
    return generatedRequestId;
  },
});
