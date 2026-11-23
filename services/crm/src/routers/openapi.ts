import { Router } from 'express';
import { openApiDocument } from '../openapi/document';

export const openApiRouter = Router();

openApiRouter.get('/', (_request, response) => {
  response.status(200).json(openApiDocument);
});
