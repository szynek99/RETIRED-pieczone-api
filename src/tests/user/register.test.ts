/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import bcrypt from 'bcryptjs';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { addUser, resetUser } from 'db/services/user';
import { HttpStatusCode } from 'constants/common';

describe('User: register', () => {
  beforeAll(() => {
    resetUser();
    addUser({
      username: 'JohnDoe',
      password: bcrypt.hashSync('Password1!', 10),
      role: 'user',
    });
  });

  it('fields validation', async () => {
    const response = await request(app).post(`${ROUTES.USER.BASE}/register`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('username');
    expect(body.errors).toHaveProperty('password');
    expect(body.errors).toHaveProperty('role');
  });

  it('incorrect login: username already taken', async () => {
    const response = await request(app)
      .post(`${ROUTES.USER.BASE}/register`)
      .send({ username: 'JohnDoe', password: 'Password2!', role: 'user' });

    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('username');
  });

  it('incorrect login: username already taken', async () => {
    const response = await request(app)
      .post(`${ROUTES.USER.BASE}/register`)
      .send({ username: 'JohnDoe', password: 'Password2!', role: 'user' });

    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('username');
  });

  it('correct register', async () => {
    const response = await request(app)
      .post(`${ROUTES.USER.BASE}/register`)
      .send({ username: 'Maximus1', password: 'Password2!', role: 'user' });

    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toBe('');
  });
});
