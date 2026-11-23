import { describe, expect, it } from 'vitest';
import { getDemoOverview } from '../src/data/overview';

describe('demo overview service', () => {
  it('derives roster metrics from the next scheduled event', () => {
    expect(getDemoOverview()).toMatchObject({
      metrics: { upcomingEvents: 2, scheduledGhosts: 3, attendanceDue: 2 },
      nextEvent: { id: 'ravens-hollow-haunted-tour' },
    });
  });
});
