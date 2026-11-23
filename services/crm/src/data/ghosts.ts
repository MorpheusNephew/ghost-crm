import {
  ghostDetailSchema,
  ghostListResponseSchema,
  type GhostDetail,
  type GhostSummary,
} from '@ghost-crm/contracts';
import { demoEvents } from './events';

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

export const getDemoGhost = (ghostId: string): GhostDetail | undefined => {
  const ghost = demoGhosts.find((candidate) => candidate.id === ghostId);
  if (!ghost) return undefined;

  const event = demoEvents.find((candidate) =>
    candidate.roster.some((rosterGhost) => rosterGhost.id === ghost.id),
  );
  const availability =
    ghost.lifecycle === 'inactive' ? 'needs_review' : event ? 'assigned' : 'available';

  return ghostDetailSchema.parse({
    ...ghost,
    availability,
    ...(event
      ? {
          upcomingAssignment: {
            eventId: event.id,
            eventTitle: event.title,
            startsAt: event.startsAt,
            endsAt: event.endsAt,
            venue: event.venue,
          },
        }
      : {}),
  });
};
