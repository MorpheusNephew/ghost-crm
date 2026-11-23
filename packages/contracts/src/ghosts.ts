import { z } from './openapi.js';
import { venueSchema } from './venues.js';

export const ghostSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  lifecycle: z.enum(['active', 'inactive']),
  threatLevel: z.enum(['low', 'moderate', 'high']),
});
export const ghostListResponseSchema = z.object({ ghosts: z.array(ghostSummarySchema) });
export const ghostAvailabilitySchema = z.enum(['available', 'assigned', 'needs_review']);
export const ghostAssignmentSchema = z.object({
  eventId: z.string(),
  eventTitle: z.string(),
  startsAt: z.iso.datetime({ offset: true }),
  endsAt: z.iso.datetime({ offset: true }),
  venue: venueSchema,
});
export const ghostDetailSchema = ghostSummarySchema.extend({
  availability: ghostAvailabilitySchema,
  upcomingAssignment: ghostAssignmentSchema.optional(),
});
export const ghostDetailResponseSchema = z.object({ ghost: ghostDetailSchema });
export type GhostSummary = z.infer<typeof ghostSummarySchema>;
export type GhostDetail = z.infer<typeof ghostDetailSchema>;
