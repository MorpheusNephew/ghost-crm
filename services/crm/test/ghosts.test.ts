import { describe, expect, it } from 'vitest';
import { getDemoGhost, listDemoGhosts } from '../src/data/ghosts';

describe('demo ghost service', () => {
  it('returns valid ghost summaries', () => {
    expect(listDemoGhosts()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'lady-grey',
          lifecycle: 'active',
          threatLevel: 'low',
        }),
      ]),
    );
  });

  it('derives a ghost assignment from the event roster', () => {
    expect(getDemoGhost('lady-grey')).toMatchObject({
      availability: 'assigned',
      upcomingAssignment: { eventId: 'ravens-hollow-haunted-tour' },
    });
  });

  it('returns undefined for a missing ghost', () => {
    expect(getDemoGhost('missing-ghost')).toBeUndefined();
  });
});
