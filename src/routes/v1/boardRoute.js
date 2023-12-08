import express from 'express';
import { boardValidation } from '~/validations/boardValidation';
import { boardController } from '~/controllers/boardController';

const Router = express.Router();

Router.route('/')
  .get((req, res) => {})
  .post(boardValidation.createNew, boardController.createNew);

Router.route('/:id')
  .get(boardController.getDetails)
  .put();

export const boardRoute = Router;