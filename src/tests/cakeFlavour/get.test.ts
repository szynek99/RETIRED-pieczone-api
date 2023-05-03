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

describe('CakeType: get', () => {
  beforeAll(async () => {
    const promises = [];
    await resetCakeFlavour();
    for (let i = 1; i <= 9; i += 1) {
      promises.push(
        addCakeFlavour({
          name: `Flavour name ${i}`,
          value: `Flavour value ${i}`,
          accessible: i % 2 === 0,
        }),
      );
    }
    await Promise.all(promises);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('get all: no parameters', async () => {
    const response = await request(app).get(ROUTES.CAKE_FLAVOURS.BASE).send();
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(9);
  });

  it('get all: limit to 1', async () => {
    const response = await request(app).get(`${ROUTES.CAKE_FLAVOURS.BASE}?page=1&pageSize=1`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(1);
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('value');
    expect(body[0]).toHaveProperty('accessible');
    expect(body[0]).toHaveProperty('id');
  });

  it('incorrect single get: no id', async () => {
    const response = await request(app).get(`${ROUTES.CAKE_FLAVOURS.BASE}/non-existing-id`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('id');
  });

  it('correct single get: by id', async () => {
    const sampleCakeType = await addCakeFlavour({
      name: 'Orange',
      value: 'orange',
      accessible: true,
    });

    const response = await request(app).get(`${ROUTES.CAKE_FLAVOURS.BASE}/${sampleCakeType.id}`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('name', sampleCakeType.name);
    expect(body).toHaveProperty('value', sampleCakeType.value);
    expect(body).toHaveProperty('accessible', sampleCakeType.accessible);
  });
});
