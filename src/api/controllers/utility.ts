import { Request, Response } from 'express';
import { HttpStatusCode } from 'constants/common';
import { serverError } from 'api/utils/Response';

const getHealth = async (req: Request, res: Response) => {
  try {
    const healthResponse = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
    };

    res.status(HttpStatusCode.OK).json(healthResponse);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default { getHealth };
