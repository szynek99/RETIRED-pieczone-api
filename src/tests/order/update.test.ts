/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import { nanoid } from 'nanoid';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { OrderInput } from 'db/models/order';
import { HttpStatusCode } from 'constants/common';
import { addOrder, resetOrder } from 'db/services/order';
import { NextFunction, Request, Response } from 'express';

const SAMPLE_ORDER = {
  hash: nanoid(),
  firstname: 'John',
  surname: 'Doe',
  phoneNumber: '536389112',
  cakeType: 'fruit',
  cakeFlavour: 'cherry',
  spongeColour: 'dark',
  cakeWeight: 2.2,
  cakeShape: 'round',
  alcoholAllowed: true,
};

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('Order: update', () => {
  beforeAll(async () => {
    await resetOrder();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('incorrect single delete: no id', async () => {
    const response = await request(app).delete(`${ROUTES.ORDERS.BASE}/`);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('id');
  });

  it('correct single update', async () => {
    const addedOrder = await addOrder(SAMPLE_ORDER as OrderInput);
    const NEW_BODY = {
      hash: nanoid(),
      firstname: 'Mick',
      surname: 'Ferguson',
      phoneNumber: '526389321',
      cakeType: 'cream',
      cakeFlavour: 'strawberry',
      spongeColour: 'bright',
      cakeWeight: 5,
      cakeShape: 'square',
      alcoholAllowed: false,
      status: 'finished',
      cakeInscription: 'sample inscription',
      commentsToOrder: 'be nice',
      occasion: 'birthday',
    };
    const response = await request(app)
      .put(`${ROUTES.ORDERS.BASE}/${addedOrder.id}`)
      .send(NEW_BODY);

    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('id', addedOrder.id);
    expect(body).toHaveProperty('hash', addedOrder.hash);
    expect(body).toHaveProperty('firstname', NEW_BODY.firstname);
    expect(body).toHaveProperty('surname', NEW_BODY.surname);
    expect(body).toHaveProperty('phoneNumber', NEW_BODY.phoneNumber);
    expect(body).toHaveProperty('cakeType', NEW_BODY.cakeType);
    expect(body).toHaveProperty('cakeFlavour', NEW_BODY.cakeFlavour);
    expect(body).toHaveProperty('cakeWeight', NEW_BODY.cakeWeight);
    expect(body).toHaveProperty('cakeShape', NEW_BODY.cakeShape);
    expect(body).toHaveProperty('alcoholAllowed', NEW_BODY.alcoholAllowed);
    expect(body).toHaveProperty('cakeInscription', NEW_BODY.cakeInscription);
    expect(body).toHaveProperty('commentsToOrder', NEW_BODY.commentsToOrder);
    expect(body).toHaveProperty('imageUrl', null);
    expect(body).toHaveProperty('occasion', NEW_BODY.occasion);
    expect(body).toHaveProperty('status', NEW_BODY.status);
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
  });
});
