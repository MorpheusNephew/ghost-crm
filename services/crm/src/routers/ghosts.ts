import { Router } from 'express';
import { listDemoGhosts } from '../data/ghosts';

export const ghostsRouter = Router();

ghostsRouter.get('/', (_request, response) => {
  response.status(200).json({ ghosts: listDemoGhosts() });
});
