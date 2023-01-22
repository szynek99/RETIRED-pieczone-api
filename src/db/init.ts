import * as dotenv from 'dotenv';
import Order from 'db/models/order';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
  Order.sync({ alter: isDev });
};

export default dbInit;
