/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
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

dbInit();

const app: Application = express();
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ROUTES.ORDERS, orderRouter);
app.use(ROUTES.AUTH.BASE, authRouter);
app.use(ROUTES.IMAGES, express.static('uploads'));

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

module.exports = server;
