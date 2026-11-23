import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from '@asteasolutions/zod-to-openapi';
import {
  eventDetailResponseSchema,
  eventListResponseSchema,
  ghostDetailResponseSchema,
  ghostListResponseSchema,
  overviewResponseSchema,
  venueListResponseSchema,
} from '@ghost-crm/contracts';
import { z } from 'zod';

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

const healthResponseSchema = registry.register(
  'HealthResponse',
  z.object({
    service: z.literal('crm'),
    status: z.literal('ok'),
  }),
);
const eventListResponse = registry.register('EventListResponse', eventListResponseSchema);
const eventDetailResponse = registry.register('EventDetailResponse', eventDetailResponseSchema);
const ghostListResponse = registry.register('GhostListResponse', ghostListResponseSchema);
const ghostDetailResponse = registry.register('GhostDetailResponse', ghostDetailResponseSchema);
const overviewResponse = registry.register('OverviewResponse', overviewResponseSchema);
const venueListResponse = registry.register('VenueListResponse', venueListResponseSchema);
const eventIdParamsSchema = z.object({ eventId: z.string().min(1) });
const ghostIdParamsSchema = z.object({ ghostId: z.string().min(1) });
const errorResponseSchema = registry.register('ErrorResponse', z.object({ error: z.string() }));

registry.registerPath({
  method: 'get',
  path: '/health',
  operationId: 'getHealth',
  summary: 'Check CRM service health',
  responses: {
    200: {
      description: 'The CRM service is available.',
      content: { 'application/json': { schema: healthResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/ghosts/{ghostId}',
  operationId: 'getGhost',
  summary: 'Get a ghost profile',
  tags: ['Ghosts'],
  request: { params: ghostIdParamsSchema },
  responses: {
    200: {
      description: 'The ghost profile and its next assignment.',
      content: { 'application/json': { schema: ghostDetailResponse } },
    },
    404: {
      description: 'No ghost matches the identifier.',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/overview',
  operationId: 'getOverview',
  summary: 'Get the operations overview',
  tags: ['Overview'],
  responses: {
    200: {
      description: 'The next event and its derived operational metrics.',
      content: { 'application/json': { schema: overviewResponse } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/venues',
  operationId: 'listVenues',
  summary: 'List venues',
  tags: ['Venues'],
  responses: {
    200: {
      description: 'The available venues.',
      content: { 'application/json': { schema: venueListResponse } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/ghosts',
  operationId: 'listGhosts',
  summary: 'List ghosts',
  tags: ['Ghosts'],
  responses: {
    200: {
      description: 'The available ghost profiles.',
      content: { 'application/json': { schema: ghostListResponse } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/events',
  operationId: 'listEvents',
  summary: 'List events',
  tags: ['Events'],
  responses: {
    200: {
      description: 'The available events.',
      content: { 'application/json': { schema: eventListResponse } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/events/{eventId}',
  operationId: 'getEvent',
  summary: 'Get an event',
  tags: ['Events'],
  request: { params: eventIdParamsSchema },
  responses: {
    200: {
      description: 'The event and its roster.',
      content: { 'application/json': { schema: eventDetailResponse } },
    },
    404: {
      description: 'No event matches the provided identifier.',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
});

export const openApiDocument = new OpenApiGeneratorV31(registry.definitions).generateDocument({
  openapi: '3.1.0',
  info: {
    title: 'Ghost CRM API',
    version: '0.1.0',
    description: 'The API for the Ghost CRM scheduling service.',
  },
  tags: [
    { name: 'Events', description: 'Event scheduling and roster data.' },
    { name: 'Ghosts', description: 'Ghost profile data.' },
    { name: 'Overview', description: 'Operational dashboard data.' },
    { name: 'Venues', description: 'Venue availability data.' },
  ],
});
