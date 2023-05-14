/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { HttpStatusCode } from 'constants/common';
import { NextFunction, Request, Response } from 'express';
import { addCakeType, resetCakeType } from 'db/services/cakeType';

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  isAdmin: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('CakeType: delete', () => {
  beforeAll(async () => {
    await resetCakeType();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('incorrect single delete: wrong id', async () => {
    const response = await request(app).delete(`${ROUTES.CAKE_TYPES.BASE}/50`);
    const { status } = response;

    expect(status).toBe(HttpStatusCode.NOT_FOUND);
  });

  it('correct single delete', async () => {
    const addedOrder = await addCakeType({
      name: 'Cherry',
      value: 'cherry',
      accessible: true,
      customizable: true,
    });

    const response = await request(app).delete(`${ROUTES.CAKE_TYPES.BASE}/${addedOrder.id}`);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('name', addedOrder.name);
    expect(body).toHaveProperty('value', addedOrder.value);
    expect(body).toHaveProperty('accessible', addedOrder.accessible);
    expect(body).toHaveProperty('customizable', addedOrder.customizable);
  });
});
