/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { resetUser } from 'db/services/user';

describe('user/register', () => {
  beforeEach(resetUser);

  it('fields validation', async () => {
    const response = await request(app).post('/api/auth/register');
    const { status, body } = response;
    expect(status).toBe(422);
    expect(body).toHaveProperty('status', 422);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { error: 'Zły format', name: 'username' },
        { error: 'Zły format', name: 'password' },
        { error: 'Zły format', name: 'role' },
      ]),
    );
  });

  it('username duplicate', async () => {
    const payload = { username: 'testUser', password: 'testPassword', role: 'user' };
    await request(app).post('/api/auth/register').send(payload);
    const response = await request(app).post('/api/auth/register').send(payload);
    const { status, body } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty('status', 400);
    expect(body.error).toBe('Użytkownik już istnieje');
  });

  it('user register', async () => {
    const payload = { username: 'testUser', password: 'testPassword', role: 'user' };
    const response = await request(app).post('/api/auth/register').send(payload);
    const { status, text } = response;
    expect(status).toBe(200);
    expect(text).toMatch('Użytkownik pomyślnie stworzony');
  });
});
