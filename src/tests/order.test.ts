/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';

describe('user/register', () => {
  it('make order - check required fields', async () => {
    const response = await request(app).post('/api/order');
    const { status, body } = response;
    expect(status).toBe(422);
    expect(body).toHaveProperty('status', 422);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { name: 'firstname', error: 'Nieprawidłowa wartość' },
        { name: 'surname', error: 'Nieprawidłowa wartość' },
        { name: 'phoneNumber', error: 'Nieprawidłowa wartość' },
        { name: 'cakeType', error: 'Nieprawidłowa wartość' },
        { name: 'cakeFlavour', error: 'Nieprawidłowa wartość' },
        { name: 'spongeColour', error: 'Nieprawidłowa wartość' },
        { name: 'cakeWeight', error: 'Nieprawidłowa wartość' },
        { name: 'cakeShape', error: 'Nieprawidłowa wartość' },
        { name: 'alcoholAllowed', error: 'Nieprawidłowa wartość' },
      ]),
    );
  });
});
