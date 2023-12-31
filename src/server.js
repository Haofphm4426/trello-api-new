/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express';
import cors from 'cors';
import { corsOptions } from '~/config/cors';
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb';
import { env } from './config/environment';
import { APIs_V1 } from '~/routes/v1';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';

const START_SERVER = () => {
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use('/v1', APIs_V1);

  //Middleware xử lý lỗi
  app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production: Hello ${env.AUTHOR}, I am running at ${process.env.PORT}`);
    });
  } else {
    app.listen(env.APP_PORT, env.APP_HOST, () => {
      console.log(`Local: Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`);
    });
  }


  exitHook(() => {
    CLOSE_DB();
  });
};

CONNECT_DB()
  .then(() => console.log('Connected to MongoDB Cloud Atlas'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error);
    process.exit(0);
  });
