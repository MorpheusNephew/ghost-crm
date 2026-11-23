import { venueListResponseSchema, type Venue } from '@ghost-crm/contracts';

export const demoVenues: Venue[] = [
  { id: 'ravens-hollow-estate', name: "Raven's Hollow Estate", address: '1200 Ravenswood Lane' },
  { id: 'blackwater-manor', name: 'Blackwater Manor', address: '13 Briar Road' },
];

export const listDemoVenues = (): Venue[] =>
  venueListResponseSchema.parse({ venues: demoVenues }).venues;
