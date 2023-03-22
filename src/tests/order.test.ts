/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { resetOrder } from 'db/services/order';

const PAYLOAD = {
  firstname: 'John',
  surname: 'Kowalsky',
  phoneNumber: '536389110',
  cakeType: 'fruit',
  cakeFlavour: 'cherry',
  spongeColour: 'dark',
  cakeWeight: 2,
  cakeShape: 'round',
  alcoholAllowed: true,
};

describe('order', () => {
  beforeEach(resetOrder);

  it('post order - fields validation', async () => {
    const response = await request(app).post('/api/order');
    const { status, body } = response;

    expect(status).toBe(422);
    expect(body).toHaveProperty('status', 422);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { name: 'firstname', error: 'Zły format' },
        { name: 'firstname', error: 'Za krótkie' },
        { name: 'surname', error: 'Zły format' },
        { name: 'surname', error: 'Za krótkie' },
        { name: 'phoneNumber', error: 'Zły format' },
        { name: 'phoneNumber', error: 'Za krótkie' },
        { name: 'phoneNumber', error: 'Nieprawidłowa wartość' },
        { name: 'cakeType', error: 'Zły format' },
        { name: 'cakeType', error: 'Za krótkie' },
        { name: 'cakeFlavour', error: 'Zły format' },
        { name: 'cakeFlavour', error: 'Za krótkie' },
        { name: 'spongeColour', error: 'Zły format' },
        { name: 'spongeColour', error: 'Za krótkie' },
        { name: 'spongeColour', error: 'Nieprawidłowa wartość' },
        { name: 'cakeWeight', error: 'Nieprawidłowa wartość' },
        { name: 'cakeShape', error: 'Zły format' },
        { name: 'cakeShape', error: 'Za krótkie' },
        { name: 'cakeShape', error: 'Nieprawidłowa wartość' },
        { name: 'alcoholAllowed', error: 'Nieprawidłowa wartość' },
      ]),
    );
  });

  it('add order', async () => {
    const response = await request(app).post('/api/order').send(PAYLOAD);
    const { status, body } = response;

    expect(status).toBe(200);
    expect(body).toHaveProperty('firstname', 'John');
    expect(body).toHaveProperty('surname', 'Kowalsky');
    expect(body).toHaveProperty('phoneNumber', '536389110');
    expect(body).toHaveProperty('cakeType', 'fruit');
    expect(body).toHaveProperty('cakeFlavour', 'cherry');
    expect(body).toHaveProperty('cakeWeight', 2);
    expect(body).toHaveProperty('cakeShape', 'round');
    expect(body).toHaveProperty('alcoholAllowed', true);
    expect(body).toHaveProperty('status', 'pending');
    expect(body).toHaveProperty('hash');
    expect(body.hash).toHaveLength(21);
  });

  it('get order', async () => {
    const postResponse = await request(app).post('/api/order').send(PAYLOAD);
    const { body: postBody } = postResponse;

    expect(postBody).toHaveProperty('hash');
    expect(postBody.hash).toHaveLength(21);
    const response = await request(app).get(`/api/order/${postBody.hash}`);
    const { status, body } = response;

    expect(status).toBe(200);
    expect(body).toHaveProperty('firstname', 'John');
    expect(body).toHaveProperty('surname', 'Kowalsky');
    expect(body).toHaveProperty('phoneNumber', '536389110');
    expect(body).toHaveProperty('cakeType', 'fruit');
    expect(body).toHaveProperty('cakeFlavour', 'cherry');
    expect(body).toHaveProperty('cakeWeight', 2);
    expect(body).toHaveProperty('cakeShape', 'round');
    expect(body).toHaveProperty('alcoholAllowed', true);
    expect(body).toHaveProperty('status', 'pending');
    expect(body).toHaveProperty('hash');
    expect(body.hash).toHaveLength(21);
  });
});
