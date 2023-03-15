/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { resetUser } from 'db/services/auth';
import app from 'api/app';

describe('user/register', () => {
  beforeEach(resetUser);

  it('required fields', async () => {
    const response = await request(app).post('/api/auth/register');
    const { status, body } = response;
    expect(status).toBe(422);
    expect(body).toHaveProperty('status', 422);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { name: 'username', error: 'Nieprawidłowa wartość' },
        { name: 'password', error: 'Nieprawidłowa wartość' },
        { name: 'role', error: 'Nieprawidłowa wartość' },
      ]),
    );
  });

  it('bad request', async () => {
    const payload = { username: 3, password: 'test', role: 'admin' };
    const response = await request(app).post('/api/auth/register').send(payload);
    const { status, body } = response;
    expect(status).toBe(422);
    expect(body).toHaveProperty('status', 422);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { name: 'username', error: 'Nieprawidłowa wartość' },
        { name: 'password', error: 'Nieprawidłowa wartość' },
        { name: 'role', error: 'Nieprawidłowa wartość' },
      ]),
    );
  });

  it('user register', async () => {
    const payload = { username: 'testUser', password: 'testPassword', role: 'user' };
    const response = await request(app).post('/api/auth/register').send(payload);
    const { status, text } = response;
    expect(status).toBe(200);
    expect(text).toMatch('user created successfully');
  });

  it('username duplicate', async () => {
    const payload = { username: 'testUser', password: 'testPassword', role: 'user' };
    await request(app).post('/api/auth/register').send(payload);
    const response = await request(app).post('/api/auth/register').send(payload);
    const { status, body } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty('status', 400);
    expect(body.error).toBe('user already exists');
  });
});
