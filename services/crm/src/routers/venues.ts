import { Router } from 'express';
import { listDemoVenues } from '../data/venues';

export const venuesRouter = Router();

venuesRouter.get('/', (_request, response) => {
  response.status(200).json({ venues: listDemoVenues() });
});
