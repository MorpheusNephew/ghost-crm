import { z } from './openapi.js';
import { eventDetailSchema } from './events.js';

export const overviewResponseSchema = z.object({
  metrics: z.object({
    upcomingEvents: z.number().int().nonnegative(),
    scheduledGhosts: z.number().int().nonnegative(),
    attendanceDue: z.number().int().nonnegative(),
    schedulingConflicts: z.number().int().nonnegative(),
  }),
  nextEvent: eventDetailSchema,
});
