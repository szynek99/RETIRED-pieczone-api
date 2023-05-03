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

describe('Order: delete', () => {
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

  it('correct single delete', async () => {
    const addedOrder = await addOrder(SAMPLE_ORDER as OrderInput);
    const response = await request(app).delete(`${ROUTES.ORDERS.BASE}/${addedOrder.id}`);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('firstname', addedOrder.firstname);
    expect(body).toHaveProperty('surname', addedOrder.surname);
    expect(body).toHaveProperty('phoneNumber', addedOrder.phoneNumber);
    expect(body).toHaveProperty('cakeType', addedOrder.cakeType);
    expect(body).toHaveProperty('cakeFlavour', addedOrder.cakeFlavour);
    expect(body).toHaveProperty('cakeWeight', addedOrder.cakeWeight);
    expect(body).toHaveProperty('cakeShape', addedOrder.cakeShape);
    expect(body).toHaveProperty('alcoholAllowed', addedOrder.alcoholAllowed);
    expect(body).toHaveProperty('cakeInscription', addedOrder.cakeInscription);
    expect(body).toHaveProperty('commentsToOrder', addedOrder.commentsToOrder);
    expect(body).toHaveProperty('imageUrl', addedOrder.imageUrl);
    expect(body).toHaveProperty('occasion', addedOrder.occasion);
    expect(body).toHaveProperty('status', 'pending');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
  });

  it('correct multiple delete', async () => {
    const addedOrder1 = await addOrder(SAMPLE_ORDER as OrderInput);
    const addedOrder2 = await addOrder(SAMPLE_ORDER as OrderInput);
    const response = await request(app).delete(
      `${ROUTES.ORDERS.BASE}?id=${addedOrder1.id}&id=${addedOrder2.id}`,
    );

    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(2);
  });
});
