import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app';

const app = createApp();

describe('CRM application', () => {
  it('reports service health', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ service: 'crm', status: 'ok' });
  });

  it('lists event summaries without rosters', async () => {
    const response = await request(app).get('/api/events');

    expect(response.status).toBe(200);
    expect(response.body.events).toHaveLength(2);
    expect(response.body.events[0]).not.toHaveProperty('roster');
  });

  it('returns an event detail and reports missing events', async () => {
    const detail = await request(app).get('/api/events/ravens-hollow-haunted-tour');
    const missing = await request(app).get('/api/events/missing-event');

    expect(detail.status).toBe(200);
    expect(detail.body.event.roster).toHaveLength(3);
    expect(missing.status).toBe(404);
    expect(missing.body).toEqual({ error: 'Event not found' });
  });

  it('publishes the documented OpenAPI paths', async () => {
    const response = await request(app).get('/openapi.json');

    expect(response.status).toBe(200);
    expect(response.body.openapi).toBe('3.1.0');
    expect(response.body.paths).toMatchObject({
      '/health': expect.any(Object),
      '/api/events': expect.any(Object),
      '/api/events/{eventId}': expect.any(Object),
    });
  });
});
