import { Router } from 'express';
import { getDemoOverview } from '../data/overview';

export const overviewRouter = Router();

overviewRouter.get('/', (_request, response) => {
  response.status(200).json(getDemoOverview());
});
