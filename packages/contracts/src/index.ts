import { z } from 'zod';

export const eventStatusSchema = z.enum(['draft', 'scheduled', 'cancelled']);
export const attendanceSchema = z.enum(['pending', 'attended', 'no_show']);
export const venueSchema = z.object({ id: z.string(), name: z.string(), address: z.string() });
export const ghostSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  lifecycle: z.enum(['active', 'inactive']),
  threatLevel: z.enum(['low', 'moderate', 'high']),
});
export const eventSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: eventStatusSchema,
  startsAt: z.iso.datetime(),
  endsAt: z.iso.datetime(),
  venue: venueSchema,
  ghostCount: z.number().int().nonnegative(),
});
export const eventDetailSchema = eventSummarySchema.extend({
  roster: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      attendance: attendanceSchema,
      note: z.string().optional(),
    }),
  ),
});
export const eventListResponseSchema = z.object({ events: z.array(eventSummarySchema) });
export const eventDetailResponseSchema = z.object({ event: eventDetailSchema });
export const ghostListResponseSchema = z.object({ ghosts: z.array(ghostSummarySchema) });
export type EventSummary = z.infer<typeof eventSummarySchema>;
export type EventDetail = z.infer<typeof eventDetailSchema>;
export type GhostSummary = z.infer<typeof ghostSummarySchema>;
