/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { HttpStatusCode } from 'constants/common';
import { addOffer, resetOffer } from 'db/services/offer';
import { NextFunction, Request, Response } from 'express';

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  isAdmin: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('Offer: get', () => {
  beforeAll(async () => {
    const promises = [];
    await resetOffer();
    for (let i = 1; i <= 9; i += 1) {
      promises.push(
        addOffer({
          title: `title ${i}`,
          placement: i,
          visible: i % 2 === 0,
          category: 'cookie',
        }),
      );
    }
    await Promise.all(promises);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('get all: no parameters', async () => {
    const response = await request(app).get(ROUTES.OFFER.BASE).send();
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(9);
  });

  it('get all: limit to 1', async () => {
    const response = await request(app).get(`${ROUTES.OFFER.BASE}?page=1&pageSize=1`);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(1);
    expect(body[0]).toHaveProperty('title');
    expect(body[0]).toHaveProperty('placement');
    expect(body[0]).toHaveProperty('visible');
    expect(body[0]).toHaveProperty('category');
  });

  it('incorrect single get: no id', async () => {
    const response = await request(app).get(`${ROUTES.OFFER.BASE}/non-existing-id`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('id');
  });

  it('correct single get: by id', async () => {
    const offer = await addOffer({
      title: `best title ever`,
      placement: 5,
      visible: true,
      category: 'snack',
    });

    const response = await request(app).get(`${ROUTES.OFFER.BASE}/${offer.id}`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('title', `best title ever`);
    expect(body).toHaveProperty('placement', 5);
    expect(body).toHaveProperty('visible', true);
    expect(body).toHaveProperty('category', 'snack');
  });
});
