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

describe('Order: update', () => {
  beforeAll(async () => {
    await resetOrder();
    await Promise.all([resetCakeFlavour(), resetCakeType()]);
    await Promise.all([
      addCakeType({
        name: 'Cream',
        value: 'cream',
        accessible: true,
        customizable: true,
      }),
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

  it('incorrect single update: wrong id', async () => {
    const response = await request(app).put(
      `${ROUTES.ORDERS.BASE}/d3aa88e2-c754-41e0-8ba6-4198a34aa0a2`,
    );
    const { status } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
  });

  it('correct single update', async () => {
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
      cakeInscription: null,
      commentsToOrder: null,
      occasion: null,
      imageAttached: false,
      pickupDate: new Date('2023-06-01'),
    });

    const response = await request(app).put(`${ROUTES.ORDERS.BASE}/${addedOrder.id}`).send({
      hash: nanoid(),
      firstname: 'Mick',
      surname: 'Ferguson',
      phoneNumber: '526389321',
      cakeType: 'cream',
      cakeFlavour: 'cherry',
      spongeColour: 'bright',
      cakeWeight: 5,
      cakeShape: 'square',
      alcoholAllowed: false,
      status: 'finished',
      cakeInscription: 'sample inscription',
      commentsToOrder: 'be nice',
      occasion: 'birthday',
      pickupDate: '2023-06-10',
    });

    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('id', addedOrder.id);
    expect(body).toHaveProperty('hash', addedOrder.hash);
    expect(body).toHaveProperty('firstname', 'Mick');
    expect(body).toHaveProperty('surname', 'Ferguson');
    expect(body).toHaveProperty('phoneNumber', '526389321');
    expect(body).toHaveProperty('cakeType', 'cream');
    expect(body).toHaveProperty('cakeFlavour', 'cherry');
    expect(body).toHaveProperty('spongeColour', 'bright');
    expect(body).toHaveProperty('cakeWeight', 5);
    expect(body).toHaveProperty('cakeShape', 'square');
    expect(body).toHaveProperty('alcoholAllowed', false);
    expect(body).toHaveProperty('cakeInscription', 'sample inscription');
    expect(body).toHaveProperty('commentsToOrder', 'be nice');
    expect(body).toHaveProperty('occasion', 'birthday');
    expect(body).toHaveProperty('status', 'finished');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('pickupDate', '2023-06-10T00:00:00.000Z');
  });
});
