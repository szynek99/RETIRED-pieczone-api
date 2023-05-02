/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import bcrypt from 'bcryptjs';
import request from 'supertest';
import { addUser, resetUser } from 'db/services/user';

describe('Integration test: user login', () => {
  beforeAll(async () => {
    await resetUser();

    addUser({
      username: 'JohnDoe',
      password: bcrypt.hashSync('password', 10),
      role: 'user',
    });
    addUser({
      username: 'FuriousJoe',
      password: bcrypt.hashSync('password', 10),
      role: 'user',
    });
    addUser({
      username: 'Maximus1',
      password: bcrypt.hashSync('password', 10),
      role: 'user',
    });
  });

  it('fields validation', async () => {
    const response = await request(app).post('/api/auth/login');
    const { status, body } = response;
    expect(status).toBe(422);
    expect(body).toHaveProperty('status', 422);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { error: 'Zły typ zmiennej', name: 'username' },
        { error: 'Zły format', name: 'password' },
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
    expect(body).toHaveProperty('token');
  });
});
