/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { HttpStatusCode } from 'constants/common';
import { NextFunction, Request, Response } from 'express';
import { addCakeFlavour, resetCakeFlavour } from 'db/services/cakeFlavour';

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('CakeFlavour: update', () => {
  beforeAll(async () => {
    await resetCakeFlavour();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('incorrect single update: empty body', async () => {
    const response = await request(app).put(`${ROUTES.CAKE_FLAVOURS.BASE}/50`);
    const { status } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
  });

  it('correct single update', async () => {
    const addedOrder = await addCakeFlavour({
      name: 'Cherry',
      value: 'cherry',
      accessible: true,
    });
    const NEW_BODY = {
      name: 'Orange',
      value: 'orange',
      accessible: false,
    };

    const response = await request(app)
      .put(`${ROUTES.CAKE_FLAVOURS.BASE}/${addedOrder.id}`)
      .send(NEW_BODY);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('id', addedOrder.id);
    expect(body).toHaveProperty('name', NEW_BODY.name);
    expect(body).toHaveProperty('value', addedOrder.value);
    expect(body).toHaveProperty('accessible', NEW_BODY.accessible);
  });
});
