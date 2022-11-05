import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

import { Vendia } from './vendia';

import hptRoutes from './routes/hpt';
import authRoutes from './routes/auth';
import batteryRoutes from './routes/battery';
import motorRoutes from './routes/motor';


const port = process.env.PORT || 8001;

const server = () => {
  const app = express();

  const vendiaService = new Vendia();
  vendiaService.init();

  app.locals.vendiaClient = vendiaService.getClient();
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'content-type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use(hptRoutes);
  app.use(authRoutes);
  app.use(batteryRoutes);
  app.use(motorRoutes);

  app.use((error, req, res, next) => {
    console.log(error);

    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = 'Server Error';
    }

    const errRes = {
      error: {
        message: error.message,
        status: error.statusCode,
      },
    };

    res.status(error.statusCode).json(errRes);
  });

  app.listen(port, function () {
    console.log('Server started on port: ' + port);
  });
};

server();
