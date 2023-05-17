/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { resetOffer } from 'db/services/offer';
import { HttpStatusCode } from 'constants/common';
import { NextFunction, Response, Request } from 'express';

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  isAdmin: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('Offer: add', () => {
  beforeEach(async () => {
    await resetOffer();
    jest.clearAllMocks();
  });

  it('fields validation', async () => {
    const response = await request(app).post(ROUTES.OFFER.BASE);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('title');
    expect(body.errors).toHaveProperty('placement');
    expect(body.errors).toHaveProperty('visible');
    expect(body.errors).toHaveProperty('category');
  });

  it('correct add', async () => {
    const response = await request(app).post(ROUTES.OFFER.BASE).send({
      title: 'sample title',
      placement: 1,
      visible: false,
      category: 'cake',
    });

    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title', 'sample title');
    expect(body).toHaveProperty('placement', 1);
    expect(body).toHaveProperty('visible', false);
    expect(body).toHaveProperty('category', 'cake');
  });
});
