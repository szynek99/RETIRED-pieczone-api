import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import fileUpload from 'express-fileupload';
import dbInit from 'db/init';
import orderRouter from 'api/router/order';
import { ROUTES } from 'constants/routes';
import authRouter from 'api/router/auth';

dotenv.config();
const { PORT } = process.env;
const app: Application = express();
dbInit();

const start = () => {
  try {
    app.use(bodyParser.json());
    app.use(fileUpload());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(ROUTES.ORDERS, orderRouter);
    app.use(ROUTES.AUTH.BASE, authRouter);
    app.use(ROUTES.IMAGES, express.static('uploads'));

    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.debug(error);
  }
};

start();

export default app;
