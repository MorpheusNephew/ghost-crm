import { Router } from 'express';
import { getDemoGhost, listDemoGhosts } from '../data/ghosts';

export const ghostsRouter = Router();

ghostsRouter.get('/', (_request, response) => {
  response.status(200).json({ ghosts: listDemoGhosts() });
});

ghostsRouter.get('/:ghostId', (request, response) => {
  const ghost = getDemoGhost(request.params.ghostId);
  if (!ghost) {
    response.status(404).json({ error: 'Ghost not found' });
    return;
  }
  response.status(200).json({ ghost });
});
