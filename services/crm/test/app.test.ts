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
    expect(response.headers['x-request-id']).toEqual(expect.any(String));
    expect(response.body.events).toHaveLength(2);
    expect(response.body.events[0]).not.toHaveProperty('roster');
  });

  it('preserves caller-provided request IDs', async () => {
    const response = await request(app).get('/api/events').set('x-request-id', 'request-123');

    expect(response.headers['x-request-id']).toBe('request-123');
  });

  it('lists ghost summaries', async () => {
    const response = await request(app).get('/api/ghosts');

    expect(response.status).toBe(200);
    expect(response.body.ghosts).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'lady-grey', name: 'Lady Grey' })]),
    );
  });

  it('returns ghost detail, overview, and venues', async () => {
    const ghost = await request(app).get('/api/ghosts/lady-grey');
    const missingGhost = await request(app).get('/api/ghosts/missing-ghost');
    const overview = await request(app).get('/api/overview');
    const venues = await request(app).get('/api/venues');

    expect(ghost.status).toBe(200);
    expect(ghost.body.ghost.availability).toBe('assigned');
    expect(missingGhost.status).toBe(404);
    expect(overview.body.nextEvent.id).toBe('ravens-hollow-haunted-tour');
    expect(venues.body.venues).toHaveLength(2);
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
      '/api/ghosts': expect.any(Object),
      '/api/ghosts/{ghostId}': expect.any(Object),
      '/api/overview': expect.any(Object),
      '/api/venues': expect.any(Object),
    });
  });
});
