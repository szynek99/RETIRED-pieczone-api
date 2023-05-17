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

describe('Offer: delete', () => {
  beforeAll(async () => {
    await resetOffer();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('incorrect single delete: wrong id', async () => {
    const response = await request(app).delete(`${ROUTES.OFFER.BASE}/50`);
    const { status } = response;

    expect(status).toBe(HttpStatusCode.NOT_FOUND);
  });

  it('correct single delete', async () => {
    const addedOffer = await addOffer({
      title: 'sample title',
      placement: 1,
      visible: false,
      category: 'cake',
    });

    const response = await request(app).delete(`${ROUTES.OFFER.BASE}/${addedOffer.id}`);
    const { status } = response;

    expect(status).toBe(HttpStatusCode.OK);
  });
});
