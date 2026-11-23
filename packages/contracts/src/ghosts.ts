import { z } from 'zod';

export const ghostSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  lifecycle: z.enum(['active', 'inactive']),
  threatLevel: z.enum(['low', 'moderate', 'high']),
});
export const ghostListResponseSchema = z.object({ ghosts: z.array(ghostSummarySchema) });
export type GhostSummary = z.infer<typeof ghostSummarySchema>;
