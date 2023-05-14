/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { HttpStatusCode } from 'constants/common';
import { NextFunction, Response, Request } from 'express';
import { addCakeFlavour, resetCakeFlavour } from 'db/services/cakeFlavour';

const SAMPLE_FLAVOUR = {
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

describe('CakeFlavour: add', () => {
  beforeEach(async () => {
    await resetCakeFlavour();
    jest.clearAllMocks();
  });

  it('fields validation', async () => {
    const response = await request(app).post(ROUTES.CAKE_FLAVOURS.BASE);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('name');
    expect(body.errors).toHaveProperty('value');
    expect(body.errors).toHaveProperty('accessible');
  });

  it('incorrect add: no duplicate', async () => {
    await addCakeFlavour(SAMPLE_FLAVOUR);
    const response = await request(app).post(ROUTES.CAKE_FLAVOURS.BASE).send(SAMPLE_FLAVOUR);

    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('value');
  });

  it('correct add: no optional', async () => {
    const response = await request(app).post(ROUTES.CAKE_FLAVOURS.BASE).send({
      name: 'Cherry',
      value: 'cherry',
      accessible: true,
    });

    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name', 'Cherry');
    expect(body).toHaveProperty('value', 'cherry');
    expect(body).toHaveProperty('accessible', true);
  });

  it('correct add: optional fields', async () => {
    const response = await request(app).post(ROUTES.CAKE_FLAVOURS.BASE).send({
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
  });
});
