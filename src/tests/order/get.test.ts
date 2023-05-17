/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { nanoid } from 'nanoid';
import { ROUTES } from 'constants/routes';
import { OrderOuput } from 'db/models/order';
import { HttpStatusCode } from 'constants/common';
import { addOrder, resetOrder } from 'db/services/order';
import { NextFunction, Request, Response } from 'express';
import { addCakeType, resetCakeType } from 'db/services/cakeType';
import { addCakeFlavour, resetCakeFlavour } from 'db/services/cakeFlavour';

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  isAdmin: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('Order: get', () => {
  let sampleOrderOutput: OrderOuput;
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

    for (let i = 1; i <= 9; i += 1) {
      addOrder({
        hash: nanoid(),
        firstname: 'Mark',
        surname: 'Dollitle',
        phoneNumber: `5463091${i}2`,
        cakeType: 'cream',
        cakeFlavour: 'cherry',
        spongeColour: 'dark',
        cakeWeight: i,
        cakeShape: 'square',
        alcoholAllowed: i % 2 === 0,
        cakeInscription: null,
        commentsToOrder: null,
        occasion: null,
        imageAttached: false,
      });
    }
    sampleOrderOutput = await addOrder({
      hash: nanoid(),
      firstname: 'John',
      surname: 'Vetto',
      phoneNumber: `536389111`,
      cakeType: 'chocolate',
      spongeColour: 'dark',
      cakeWeight: 4.5,
      cakeShape: 'round',
      alcoholAllowed: true,
      occasion: 'Anniversary',
      cakeInscription: 'Be happy',
      commentsToOrder: 'wedding style',
      imageAttached: false,
      cakeFlavour: null,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('get all: no parameters', async () => {
    const response = await request(app).get(ROUTES.ORDERS.BASE).send();
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(10);
  });

  it('get all: limit to 1', async () => {
    const response = await request(app).get(`${ROUTES.ORDERS.BASE}?page=1&pageSize=1`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(1);
    expect(body[0]).toHaveProperty('firstname');
    expect(body[0]).toHaveProperty('surname');
    expect(body[0]).toHaveProperty('status');
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('cakeWeight');
    expect(body[0]).toHaveProperty('createdAt');
    expect(body[0]).toHaveProperty('updatedAt');
    expect(body[0]).toHaveProperty('hash');
  });

  it('incorrect single get: no id', async () => {
    const response = await request(app).get(`${ROUTES.ORDERS.BASE}/non-existing-id`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('id');
  });

  it('correct single get: by id', async () => {
    const response = await request(app).get(`${ROUTES.ORDERS.BASE}/${sampleOrderOutput.id}`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('firstname', sampleOrderOutput.firstname);
    expect(body).toHaveProperty('surname', sampleOrderOutput.surname);
    expect(body).toHaveProperty('phoneNumber', sampleOrderOutput.phoneNumber);
    expect(body).toHaveProperty('cakeType', sampleOrderOutput.cakeType);
    expect(body).toHaveProperty('cakeFlavour', sampleOrderOutput.cakeFlavour);
    expect(body).toHaveProperty('cakeWeight', sampleOrderOutput.cakeWeight);
    expect(body).toHaveProperty('cakeShape', sampleOrderOutput.cakeShape);
    expect(body).toHaveProperty('alcoholAllowed', sampleOrderOutput.alcoholAllowed);
    expect(body).toHaveProperty('status', 'pending');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('cakeInscription', sampleOrderOutput.cakeInscription);
    expect(body).toHaveProperty('commentsToOrder', sampleOrderOutput.commentsToOrder);
    expect(body).toHaveProperty('occasion', sampleOrderOutput.occasion);
  });

  it('incorrect single get by id: incorrect id', async () => {
    const response = await request(app).get(`${ROUTES.ORDERS.BASE}/non-existing-id`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('id');
  });

  it('correct single get by id', async () => {
    const response = await request(app).get(`${ROUTES.ORDERS.BASE}/${sampleOrderOutput.id}`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('firstname', sampleOrderOutput.firstname);
    expect(body).toHaveProperty('surname', sampleOrderOutput.surname);
    expect(body).toHaveProperty('phoneNumber', sampleOrderOutput.phoneNumber);
    expect(body).toHaveProperty('cakeType', sampleOrderOutput.cakeType);
    expect(body).toHaveProperty('cakeFlavour', sampleOrderOutput.cakeFlavour);
    expect(body).toHaveProperty('cakeWeight', sampleOrderOutput.cakeWeight);
    expect(body).toHaveProperty('cakeShape', sampleOrderOutput.cakeShape);
    expect(body).toHaveProperty('alcoholAllowed', sampleOrderOutput.alcoholAllowed);
    expect(body).toHaveProperty('status', 'pending');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('cakeInscription', sampleOrderOutput.cakeInscription);
    expect(body).toHaveProperty('commentsToOrder', sampleOrderOutput.commentsToOrder);
    expect(body).toHaveProperty('occasion', sampleOrderOutput.occasion);
  });

  it('incorrect single get by id: incorrect hash', async () => {
    const response = await request(app).get(`${ROUTES.ORDERS.BASE}/public/das`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('hash');
  });

  it('correct single get by hash', async () => {
    const response = await request(app).get(
      `${ROUTES.ORDERS.BASE}/public/${sampleOrderOutput.hash}`,
    );
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(body.firstname).toBeUndefined();
    expect(body.surname).toBeUndefined();
    expect(body.phoneNumber).toBeUndefined();
    expect(body.cakeType).toBeUndefined();
    expect(body.cakeFlavour).toBeUndefined();
    expect(body.cakeWeight).toBeUndefined();
    expect(body.cakeShape).toBeUndefined();
    expect(body).toHaveProperty('hash', sampleOrderOutput.hash);
    expect(body).toHaveProperty('status', 'pending');
    expect(body.createdAt).toBeUndefined();
    expect(body.updatedAt).toBeUndefined();
    expect(body.cakeInscription).toBeUndefined();
    expect(body.commentsToOrder).toBeUndefined();
    expect(body.occasion).toBeUndefined();
  });
});
