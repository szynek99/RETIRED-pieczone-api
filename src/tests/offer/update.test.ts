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

describe('Offer: update', () => {
  beforeAll(async () => {
    await resetOffer();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('incorrect single update: empty body', async () => {
    const response = await request(app).put(`${ROUTES.OFFER.BASE}/50`);
    const { status } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
  });

  it('correct single update', async () => {
    const addedOffer = await addOffer({
      title: 'sample title',
      placement: 1,
      visible: false,
      category: 'cake',
    });
    const NEW_BODY = {
      title: 'new title',
      placement: 5,
      visible: true,
      category: 'cookie',
    };

    const response = await request(app).put(`${ROUTES.OFFER.BASE}/${addedOffer.id}`).send(NEW_BODY);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('id', addedOffer.id);
    expect(body).toHaveProperty('title', 'new title');
    expect(body).toHaveProperty('placement', 5);
    expect(body).toHaveProperty('visible', true);
    expect(body).toHaveProperty('category', 'cookie');
  });
});
