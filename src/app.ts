import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import fileUpload from 'express-fileupload';
import dbInit from 'db/init';
import orderRouter from 'api/router/order';
import { ROUTES } from 'constants/routes';

dotenv.config();
const { PORT } = process.env;

dbInit();

const start = () => {
  try {
    const app: Application = express();
    app.use(bodyParser.json());
    app.use(fileUpload());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(ROUTES.ORDERS, orderRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

start();
