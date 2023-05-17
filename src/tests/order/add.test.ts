/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { resetOrder } from 'db/services/order';
import { HttpStatusCode } from 'constants/common';
import { NextFunction, Request, Response } from 'express';
import { resetCakeType, addCakeType } from 'db/services/cakeType';
import { resetCakeFlavour, addCakeFlavour } from 'db/services/cakeFlavour';

jest.mock('api/middleware/user', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  isAdmin: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('Order: add', () => {
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

  it('fields validation', async () => {
    const response = await request(app).post(ROUTES.ORDERS.BASE);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('firstname');
    expect(body.errors).toHaveProperty('surname');
    expect(body.errors).toHaveProperty('phoneNumber');
    expect(body.errors).toHaveProperty('cakeType');
    expect(body.errors).toHaveProperty('spongeColour');
    expect(body.errors).toHaveProperty('cakeWeight');
    expect(body.errors).toHaveProperty('cakeShape');
    expect(body.errors).toHaveProperty('alcoholAllowed');
  });

  it('incorrect add: flavour required', async () => {
    const response = await request(app).post(ROUTES.ORDERS.BASE).send({
      firstname: 'Mark',
      surname: 'Dollitle',
      phoneNumber: '546309112',
      cakeType: 'cream',
      spongeColour: 'dark',
      cakeWeight: 5,
      cakeShape: 'square',
      alcoholAllowed: false,
    });
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('cakeFlavour');
  });

  it('correct add: flavour required', async () => {
    const response = await request(app).post(ROUTES.ORDERS.BASE).send({
      firstname: 'Mark',
      surname: 'Dollitle',
      phoneNumber: '546309112',
      cakeType: 'cream',
      cakeFlavour: 'cherry',
      spongeColour: 'dark',
      cakeWeight: 5,
      cakeShape: 'square',
      alcoholAllowed: false,
      cakeInscription: 'sample inscription',
      commentsToOrder: 'be nice',
      occasion: 'birthday',
    });

    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('hash');
    expect(body.hash).toHaveLength(21);
    expect(body).toHaveProperty('firstname', 'Mark');
    expect(body).toHaveProperty('surname', 'Dollitle');
    expect(body).toHaveProperty('phoneNumber', '546309112');
    expect(body).toHaveProperty('cakeType', 'cream');
    expect(body).toHaveProperty('cakeFlavour', 'cherry');
    expect(body).toHaveProperty('cakeWeight', 5);
    expect(body).toHaveProperty('cakeShape', 'square');
    expect(body).toHaveProperty('alcoholAllowed', false);
    expect(body).toHaveProperty('status', 'pending');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('cakeInscription', 'sample inscription');
    expect(body).toHaveProperty('commentsToOrder', 'be nice');
    expect(body).toHaveProperty('occasion', 'birthday');
  });

  it('correct add: flavour not required', async () => {
    const response = await request(app).post(ROUTES.ORDERS.BASE).send({
      firstname: 'Mark',
      surname: 'Dollitle',
      phoneNumber: '546309112',
      cakeType: 'chocolate',
      spongeColour: 'dark',
      cakeWeight: 5,
      cakeShape: 'square',
      alcoholAllowed: false,
      cakeInscription: 'sample inscription',
      commentsToOrder: 'be nice',
      occasion: 'birthday',
    });

    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('hash');
    expect(body.hash).toHaveLength(21);
    expect(body).toHaveProperty('firstname', 'Mark');
    expect(body).toHaveProperty('surname', 'Dollitle');
    expect(body).toHaveProperty('phoneNumber', '546309112');
    expect(body).toHaveProperty('cakeType', 'chocolate');
    expect(body).toHaveProperty('cakeFlavour', null);
    expect(body).toHaveProperty('cakeWeight', 5);
    expect(body).toHaveProperty('cakeShape', 'square');
    expect(body).toHaveProperty('alcoholAllowed', false);
    expect(body).toHaveProperty('status', 'pending');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('cakeInscription', 'sample inscription');
    expect(body).toHaveProperty('commentsToOrder', 'be nice');
    expect(body).toHaveProperty('occasion', 'birthday');
  });
});
