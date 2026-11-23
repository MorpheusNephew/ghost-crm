import { describe, expect, it } from 'vitest';
import {
  eventDetailSchema,
  eventSummarySchema,
  ghostSummarySchema,
  venueSchema,
} from '../src/index';

const event = {
  id: 'ravens-hollow-haunted-tour',
  title: "Raven's Hollow Haunted Tour",
  description: 'A guided evening tour.',
  status: 'scheduled',
  startsAt: '2026-10-31T19:00:00-04:00',
  endsAt: '2026-10-31T22:00:00-04:00',
  venue: {
    id: 'ravens-hollow-estate',
    name: "Raven's Hollow Estate",
    address: '1200 Ravenswood Lane',
  },
  ghostCount: 3,
};

describe('shared contracts', () => {
  it('accepts an event summary with timezone offsets', () => {
    expect(eventSummarySchema.safeParse(event).success).toBe(true);
  });

  it('rejects malformed event timestamps and statuses', () => {
    expect(eventSummarySchema.safeParse({ ...event, startsAt: 'tomorrow' }).success).toBe(false);
    expect(eventSummarySchema.safeParse({ ...event, status: 'complete' }).success).toBe(false);
  });

  it('accepts known attendance values and rejects unknown values', () => {
    const detail = {
      ...event,
      roster: [{ id: 'lady-grey', name: 'Lady Grey', attendance: 'no_show' }],
    };

    expect(eventDetailSchema.safeParse(detail).success).toBe(true);
    expect(
      eventDetailSchema.safeParse({
        ...detail,
        roster: [{ ...detail.roster[0], attendance: 'late' }],
      }).success,
    ).toBe(false);
  });

  it('validates ghost and venue response shapes', () => {
    expect(
      ghostSummarySchema.safeParse({
        id: 'lady-grey',
        name: 'Lady Grey',
        description: 'Estate apparition',
        imageUrl: 'https://example.com/lady-grey.png',
        lifecycle: 'active',
        threatLevel: 'low',
      }).success,
    ).toBe(true);
    expect(venueSchema.safeParse(event.venue).success).toBe(true);
    expect(venueSchema.safeParse({ ...event.venue, address: 42 }).success).toBe(false);
  });
});
