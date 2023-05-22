/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { HttpStatusCode } from 'constants/common';
import { addCakeType, resetCakeType } from 'db/services/cakeType';
import { NextFunction, Response, Request } from 'express';

const SAMPLE_TYPE = {
  name: 'Cherry',
  value: 'cherry',
  accessible: true,
  customizable: true,
};

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  isAdmin: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('CakeType: add', () => {
  beforeEach(async () => {
    await resetCakeType();
    jest.clearAllMocks();
  });

  it('fields validation', async () => {
    const response = await request(app).post(ROUTES.CAKE_TYPES.BASE);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('name');
    expect(body.errors).toHaveProperty('value');
    expect(body.errors).toHaveProperty('accessible');
    expect(body.errors).toHaveProperty('customizable');
  });

  it('incorrect add: no duplicate', async () => {
    await addCakeType(SAMPLE_TYPE);
    const response = await request(app).post(ROUTES.CAKE_TYPES.BASE).send(SAMPLE_TYPE);

    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('value');
  });

  it('correct add: no optional', async () => {
    const response = await request(app).post(ROUTES.CAKE_TYPES.BASE).send({
      name: 'Cherry',
      value: 'cherry',
      accessible: true,
      customizable: true,
    });

    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name', 'Cherry');
    expect(body).toHaveProperty('value', 'cherry');
    expect(body).toHaveProperty('accessible', true);
    expect(body).toHaveProperty('customizable', true);
    expect(body).toHaveProperty('description', null);
  });

  it('correct add: optional fields', async () => {
    const response = await request(app).post(ROUTES.CAKE_TYPES.BASE).send({
      name: 'Strawberry',
      value: 'strawberry1',
      accessible: true,
      customizable: false,
      description: 'sweet and spicy',
    });

    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name', 'Strawberry');
    expect(body).toHaveProperty('value', 'strawberry1');
    expect(body).toHaveProperty('accessible', true);
    expect(body).toHaveProperty('customizable', false);
    expect(body).toHaveProperty('description', 'sweet and spicy');
  });
});
