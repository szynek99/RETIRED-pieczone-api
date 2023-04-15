import cors from 'cors';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from 'api/router/auth';
import { ROUTES } from 'constants/routes';
import orderRouter from 'api/router/order';
import fileUpload from 'express-fileupload';
import express, { Application } from 'express';
import cakeTypeRouter from 'api/router/cakeType';
import cakeFlavourRouter from 'api/router/cakeFlavour';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ROUTES.ORDERS.BASE, orderRouter);
app.use(ROUTES.AUTH.BASE, authRouter);
app.use(ROUTES.CAKE_TYPES.BASE, cakeTypeRouter);
app.use(ROUTES.CAKE_FLAVOURS.BASE, cakeFlavourRouter);
app.use(`/uploads/orders`, express.static('uploads'));

export default app;
