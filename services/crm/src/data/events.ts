import {
  eventDetailSchema,
  eventSummarySchema,
  type EventDetail,
  type EventSummary,
} from '@ghost-crm/contracts';

const ravenVenue = {
  id: 'ravens-hollow-estate',
  name: "Raven's Hollow Estate",
  address: '1200 Ravenswood Lane',
};

export const demoEvents: EventDetail[] = [
  {
    id: 'ravens-hollow-haunted-tour',
    title: "Raven's Hollow Haunted Tour",
    description:
      "A guided evening tour through Raven's Hollow Estate, with character appearances staged across the grounds.",
    status: 'scheduled',
    startsAt: '2026-10-31T19:00:00-04:00',
    endsAt: '2026-10-31T22:00:00-04:00',
    venue: ravenVenue,
    ghostCount: 3,
    roster: [
      { id: 'lady-grey', name: 'Lady Grey', attendance: 'pending' },
      { id: 'the-bellringer', name: 'The Bellringer', attendance: 'pending' },
      {
        id: 'marlow',
        name: 'Marlow',
        attendance: 'attended',
        note: 'Arrived before guest check-in.',
      },
    ],
  },
  {
    id: 'moonlit-manor-walkthrough',
    title: 'Moonlit Manor Walkthrough',
    description: 'A draft walkthrough for the autumn visitor program.',
    status: 'draft',
    startsAt: '2026-11-06T20:00:00-05:00',
    endsAt: '2026-11-06T21:30:00-05:00',
    venue: { id: 'blackwater-manor', name: 'Blackwater Manor', address: '13 Briar Road' },
    ghostCount: 1,
    roster: [{ id: 'eleanor-vane', name: 'Eleanor Vane', attendance: 'pending' }],
  },
];

export const listDemoEvents = (): EventSummary[] =>
  demoEvents.map(({ roster: _roster, ...event }) => eventSummarySchema.parse(event));

export const getDemoEvent = (eventId: string): EventDetail | undefined => {
  const event = demoEvents.find((candidate) => candidate.id === eventId);
  return event ? eventDetailSchema.parse(event) : undefined;
};
