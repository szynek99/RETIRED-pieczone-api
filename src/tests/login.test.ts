/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { resetUser } from 'db/services/auth';

describe('user/register', () => {
  beforeEach(resetUser);

  it('fields validation', async () => {
    const response = await request(app).post('/api/auth/login');
    const { status, body } = response;
    expect(status).toBe(422);
    expect(body).toHaveProperty('status', 422);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { error: 'Zły typ zmiennej', name: 'username' },
        { error: 'Za krótkie', name: 'username' },
        { error: 'Zły format', name: 'password' },
        { error: 'Za krótkie', name: 'password' },
      ]),
    );
  });

  it('user login', async () => {
    const payload = { username: 'testUser', password: 'testPassword', role: 'user' };
    await request(app).post('/api/auth/register').send(payload);
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testUser', password: 'testPassword' });
    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('username', 'testUser');
    expect(body).toHaveProperty('role', 'user');
    expect(body).toHaveProperty('token');
  });
});
