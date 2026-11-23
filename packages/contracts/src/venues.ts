import { z } from './openapi.js';

export const venueSchema = z.object({ id: z.string(), name: z.string(), address: z.string() });
export type Venue = z.infer<typeof venueSchema>;
