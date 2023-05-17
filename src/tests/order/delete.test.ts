/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import { nanoid } from 'nanoid';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { HttpStatusCode } from 'constants/common';
import { addOrder, resetOrder } from 'db/services/order';
import { NextFunction, Request, Response } from 'express';
import { resetCakeType, addCakeType } from 'db/services/cakeType';
import { resetCakeFlavour, addCakeFlavour } from 'db/services/cakeFlavour';

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  isAdmin: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('Order: delete', () => {
  beforeAll(async () => {
    await resetOrder();
    await Promise.all([resetCakeFlavour(), resetCakeType()]);
    await Promise.all([
      addCakeType({
        name: 'Chocolate',
        value: 'chocolate',
        accessible: true,
        customizable: false,
      }),
      addCakeFlavour({
        name: 'Cherry',
        value: 'cherry',
        accessible: true,
      }),
    ]);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('incorrect single delete: wrong id', async () => {
    const response = await request(app).delete(
      `${ROUTES.ORDERS.BASE}/70a861cc-cb40-4aff-8d7a-579285386417`,
    );
    const { status } = response;

    expect(status).toBe(HttpStatusCode.NOT_FOUND);
  });

  it('correct single delete', async () => {
    const addedOrder = await addOrder({
      hash: nanoid(),
      firstname: 'John',
      surname: 'Doe',
      phoneNumber: '536389112',
      cakeType: 'chocolate',
      cakeFlavour: null,
      spongeColour: 'dark',
      cakeWeight: 2.2,
      cakeShape: 'round',
      alcoholAllowed: true,
      occasion: null,
      imageAttached: false,
      cakeInscription: null,
      commentsToOrder: null,
    });

    const response = await request(app).delete(`${ROUTES.ORDERS.BASE}/${addedOrder.id}`);
    const { status } = response;

    expect(status).toBe(HttpStatusCode.OK);
  });

  it('correct multiple delete', async () => {
    const addedOrder = await addOrder({
      hash: nanoid(),
      firstname: 'John',
      surname: 'Doe',
      phoneNumber: '536389112',
      cakeType: 'chocolate',
      cakeFlavour: null,
      spongeColour: 'dark',
      cakeWeight: 2.2,
      cakeShape: 'round',
      alcoholAllowed: true,
      occasion: null,
      imageAttached: false,
      cakeInscription: null,
      commentsToOrder: null,
    });
    const response = await request(app).delete(`${ROUTES.ORDERS.BASE}?id=${addedOrder.id}`);

    const { status } = response;
    expect(status).toBe(HttpStatusCode.OK);
  });
});
