import cors from 'cors';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from 'api/router/user';
import { ROUTES } from 'constants/routes';
import offerRouter from 'api/router/offer';
import orderRouter from 'api/router/order';
import fileUpload from 'express-fileupload';
import express, { Application } from 'express';
import cakeTypeRouter from 'api/router/cakeType';
import cakeFlavourRouter from 'api/router/cakeFlavour';
import { requestLogger } from 'api/middleware/common';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.ENVIROMENT !== 'TEST') {
  app.use(requestLogger);
}

app.use(ROUTES.ORDERS.BASE, orderRouter);
app.use(ROUTES.USER.BASE, userRouter);
app.use(ROUTES.CAKE_TYPES.BASE, cakeTypeRouter);
app.use(ROUTES.CAKE_FLAVOURS.BASE, cakeFlavourRouter);
app.use(ROUTES.OFFER.BASE, offerRouter);
app.use(`/${ROUTES.UPLOADS.ORDER}`, express.static('uploads'));
app.use(`/${ROUTES.UPLOADS.OFFER}`, express.static('offer'));

export default app;
