import { overviewResponseSchema } from '@ghost-crm/contracts';
import { demoEvents } from './events';

export const getDemoOverview = () => {
  const nextEvent = demoEvents.find((event) => event.status === 'scheduled');
  if (!nextEvent) throw new Error('Demo overview requires a scheduled event');

  return overviewResponseSchema.parse({
    metrics: {
      upcomingEvents: demoEvents.filter((event) => event.status !== 'cancelled').length,
      scheduledGhosts: nextEvent.roster.length,
      attendanceDue: nextEvent.roster.filter((ghost) => ghost.attendance === 'pending').length,
      schedulingConflicts: 0,
    },
    nextEvent,
  });
};
