import app from 'api/app';
import * as dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;

const start = () => {
  try {
    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
