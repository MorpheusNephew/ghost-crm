export const event = {
  id: 'ravens-hollow-haunted-tour',
  title: "Raven's Hollow Haunted Tour",
  description: 'A guided evening tour.',
  status: 'scheduled' as const,
  startsAt: '2026-10-31T19:00:00-04:00',
  endsAt: '2026-10-31T22:00:00-04:00',
  venue: {
    id: 'ravens-hollow-estate',
    name: "Raven's Hollow Estate",
    address: '1200 Ravenswood Lane',
  },
  ghostCount: 3,
};

export const eventDetail = {
  ...event,
  roster: [
    { id: 'lady-grey', name: 'Lady Grey', attendance: 'pending' as const },
    { id: 'marlow', name: 'Marlow', attendance: 'attended' as const, note: 'Arrived early.' },
    { id: 'the-watchman', name: 'The Watchman', attendance: 'no_show' as const },
  ],
};
