export const ghosts = [
  {
    id: 'lady-grey',
    name: 'Lady Grey',
    description: 'Estate apparition',
    imageUrl: 'https://images.example.com/ghosts/lady-grey.png',
    lifecycle: 'active' as const,
    threatLevel: 'low' as const,
  },
  {
    id: 'the-watcher',
    name: 'The Watcher',
    description: 'Gatehouse entity',
    imageUrl: 'https://images.example.com/ghosts/the-watcher.png',
    lifecycle: 'inactive' as const,
    threatLevel: 'high' as const,
  },
];

export const ghostDetail = {
  ...ghosts[0],
  availability: 'assigned' as const,
  upcomingAssignment: {
    eventId: 'ravens-hollow-haunted-tour',
    eventTitle: "Raven's Hollow Haunted Tour",
    startsAt: '2026-10-31T19:00:00-04:00',
    endsAt: '2026-10-31T22:00:00-04:00',
    venue: {
      id: 'ravens-hollow-estate',
      name: "Raven's Hollow Estate",
      address: '1200 Ravenswood Lane',
    },
  },
};
