import { describe, expect, it } from 'vitest';
import { getDemoEvent, listDemoEvents } from '../src/data/events';

describe('demo event service', () => {
  it('returns summaries without roster details', () => {
    const events = listDemoEvents();

    expect(events).toHaveLength(2);
    expect(events[0]).not.toHaveProperty('roster');
  });

  it('returns an event detail for a known identifier', () => {
    expect(getDemoEvent('ravens-hollow-haunted-tour')).toMatchObject({
      id: 'ravens-hollow-haunted-tour',
      roster: expect.arrayContaining([expect.objectContaining({ name: 'Lady Grey' })]),
    });
  });

  it('returns undefined for an unknown identifier', () => {
    expect(getDemoEvent('missing-event')).toBeUndefined();
  });
});
