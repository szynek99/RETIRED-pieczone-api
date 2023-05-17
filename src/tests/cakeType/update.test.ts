/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { HttpStatusCode } from 'constants/common';
import { addCakeType, resetCakeType } from 'db/services/cakeType';
import { NextFunction, Request, Response } from 'express';

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  isAdmin: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('CakeType: update', () => {
  beforeAll(async () => {
    await resetCakeType();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('incorrect single update: empty body', async () => {
    const response = await request(app).put(`${ROUTES.CAKE_TYPES.BASE}/50`);
    const { status } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
  });

  it('correct single update', async () => {
    const addedType = await addCakeType({
      name: 'Cherry',
      value: 'cherry',
      accessible: true,
      customizable: true,
    });
    const NEW_BODY = {
      name: 'Orange',
      value: 'orange',
      accessible: false,
      customizable: false,
      description: 'test description',
    };

    const response = await request(app)
      .put(`${ROUTES.CAKE_TYPES.BASE}/${addedType.id}`)
      .send(NEW_BODY);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('id', addedType.id);
    expect(body).toHaveProperty('name', NEW_BODY.name);
    expect(body).toHaveProperty('value', addedType.value);
    expect(body).toHaveProperty('accessible', NEW_BODY.accessible);
    expect(body).toHaveProperty('customizable', NEW_BODY.customizable);
    expect(body).toHaveProperty('description', NEW_BODY.description);
  });
});
