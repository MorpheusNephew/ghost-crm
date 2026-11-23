import { z } from './openapi.js';
import { venueSchema } from './venues.js';

export const eventStatusSchema = z.enum(['draft', 'scheduled', 'cancelled']);
export const attendanceSchema = z.enum(['pending', 'attended', 'no_show']);
export const eventSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: eventStatusSchema,
  startsAt: z.iso.datetime({ offset: true }),
  endsAt: z.iso.datetime({ offset: true }),
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
export type EventSummary = z.infer<typeof eventSummarySchema>;
export type EventDetail = z.infer<typeof eventDetailSchema>;
