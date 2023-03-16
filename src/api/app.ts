import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import fileUpload from 'express-fileupload';
import orderRouter from 'api/router/order';
import { ROUTES } from 'constants/routes';
import authRouter from 'api/router/auth';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ROUTES.ORDERS.BASE, orderRouter);
app.use(ROUTES.AUTH.BASE, authRouter);
app.use(ROUTES.IMAGES, express.static('uploads'));

export default app;
