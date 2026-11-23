import {
  eventDetailSchema,
  eventSummarySchema,
  type EventDetail,
  type EventSummary,
} from '@ghost-crm/contracts';
import { demoVenues } from './venues';

const ravenVenue = demoVenues[0]!;
const blackwaterVenue = demoVenues[1]!;

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
    venue: blackwaterVenue,
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
