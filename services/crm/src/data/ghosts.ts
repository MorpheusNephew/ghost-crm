import { ghostListResponseSchema, type GhostSummary } from '@ghost-crm/contracts';

const demoGhosts: GhostSummary[] = [
  {
    id: 'lady-grey',
    name: 'Lady Grey',
    description: 'Estate apparition',
    imageUrl: 'https://images.example.com/ghosts/lady-grey.png',
    lifecycle: 'active',
    threatLevel: 'low',
  },
  {
    id: 'the-bellringer',
    name: 'The Bellringer',
    description: 'Clock tower spirit',
    imageUrl: 'https://images.example.com/ghosts/the-bellringer.png',
    lifecycle: 'active',
    threatLevel: 'moderate',
  },
  {
    id: 'eleanor-vane',
    name: 'Eleanor Vane',
    description: 'Manor resident',
    imageUrl: 'https://images.example.com/ghosts/eleanor-vane.png',
    lifecycle: 'active',
    threatLevel: 'low',
  },
  {
    id: 'the-watcher',
    name: 'The Watcher',
    description: 'Gatehouse entity',
    imageUrl: 'https://images.example.com/ghosts/the-watcher.png',
    lifecycle: 'inactive',
    threatLevel: 'high',
  },
];

export const listDemoGhosts = (): GhostSummary[] =>
  ghostListResponseSchema.parse({ ghosts: demoGhosts }).ghosts;
