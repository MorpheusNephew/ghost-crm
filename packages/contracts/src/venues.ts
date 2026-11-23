import { z } from './openapi.js';

export const venueSchema = z.object({ id: z.string(), name: z.string(), address: z.string() });
export const venueListResponseSchema = z.object({ venues: z.array(venueSchema) });
export type Venue = z.infer<typeof venueSchema>;
