/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { resetOrder } from 'db/services/order';
import { HttpStatusCode } from 'constants/common';

const SAMPLE_ORDER_1 = {
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

const SAMPLE_ORDER_2 = {
  firstname: 'Mark',
  surname: 'Dollitle',
  phoneNumber: '546309112',
  cakeType: 'vanilla',
  cakeFlavour: 'cherry',
  spongeColour: 'dark',
  cakeWeight: 5,
  cakeShape: 'square',
  alcoholAllowed: false,
  cakeInscription: 'sample inscription',
  commentsToOrder: 'be nice',
  occasion: 'birthday',
};

jest.mock('db/services/cakeType', () => ({
  getCakeTypeByValue: async () => ({ customizable: true }),
}));

describe('Order: add', () => {
  beforeAll(() => {
    resetOrder();
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
      cakeType: 'roche',
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

  it('correct add: no optional fields', async () => {
    const response = await request(app).post(ROUTES.ORDERS.BASE).send(SAMPLE_ORDER_1);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('hash');
    expect(body.hash).toHaveLength(21);
    expect(body).toHaveProperty('firstname', SAMPLE_ORDER_1.firstname);
    expect(body).toHaveProperty('surname', SAMPLE_ORDER_1.surname);
    expect(body).toHaveProperty('phoneNumber', SAMPLE_ORDER_1.phoneNumber);
    expect(body).toHaveProperty('cakeType', SAMPLE_ORDER_1.cakeType);
    expect(body).toHaveProperty('cakeFlavour', SAMPLE_ORDER_1.cakeFlavour);
    expect(body).toHaveProperty('cakeWeight', SAMPLE_ORDER_1.cakeWeight);
    expect(body).toHaveProperty('cakeShape', SAMPLE_ORDER_1.cakeShape);
    expect(body).toHaveProperty('alcoholAllowed', SAMPLE_ORDER_1.alcoholAllowed);
    expect(body).toHaveProperty('status', 'pending');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('cakeInscription', null);
    expect(body).toHaveProperty('commentsToOrder', null);
    expect(body).toHaveProperty('image', null);
    expect(body).toHaveProperty('occasion', null);
  });

  it('correct add: optional fields', async () => {
    const response = await request(app).post(ROUTES.ORDERS.BASE).send(SAMPLE_ORDER_2);
    const { status, body } = response;

    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('hash');
    expect(body.hash).toHaveLength(21);
    expect(body).toHaveProperty('firstname', SAMPLE_ORDER_2.firstname);
    expect(body).toHaveProperty('surname', SAMPLE_ORDER_2.surname);
    expect(body).toHaveProperty('phoneNumber', SAMPLE_ORDER_2.phoneNumber);
    expect(body).toHaveProperty('cakeType', SAMPLE_ORDER_2.cakeType);
    expect(body).toHaveProperty('cakeFlavour', SAMPLE_ORDER_2.cakeFlavour);
    expect(body).toHaveProperty('cakeWeight', SAMPLE_ORDER_2.cakeWeight);
    expect(body).toHaveProperty('cakeShape', SAMPLE_ORDER_2.cakeShape);
    expect(body).toHaveProperty('alcoholAllowed', SAMPLE_ORDER_2.alcoholAllowed);
    expect(body).toHaveProperty('status', 'pending');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('cakeInscription', SAMPLE_ORDER_2.cakeInscription);
    expect(body).toHaveProperty('commentsToOrder', SAMPLE_ORDER_2.commentsToOrder);
    expect(body).toHaveProperty('image', false);
    expect(body).toHaveProperty('occasion', SAMPLE_ORDER_2.occasion);
  });
});
