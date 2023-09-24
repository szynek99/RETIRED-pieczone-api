import fs from 'fs';
import app from 'api/app';
import https from 'https';
import * as dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;

const start = () => {
  try {
    https
      .createServer(
        {
          key: fs.readFileSync('certs/key.pem'),
          cert: fs.readFileSync('certs/cert.pem'),
        },
        app,
      )
      .listen(Number(PORT), () => {
        console.log(`Server is running on PORT ${PORT}`);
      });
  } catch (error) {
    console.error(error);
  }
};

start();
