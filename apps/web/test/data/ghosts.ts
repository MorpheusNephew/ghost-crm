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
