/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import bcrypt from 'bcryptjs';
import request from 'supertest';
import { addUser, resetUser } from 'db/services/user';
import { ROUTES } from 'constants/routes';
import { HttpStatusCode } from 'constants/common';

describe('User: login', () => {
  beforeAll(() => {
    resetUser();
    addUser({
      username: 'JohnDoe',
      password: bcrypt.hashSync('Password1!', 10),
      role: 'user',
    });
    addUser({
      username: 'FuriousJoe',
      password: bcrypt.hashSync('Password2!', 10),
      role: 'user',
    });
    addUser({
      username: 'Maximus1',
      password: bcrypt.hashSync('Password3!', 10),
      role: 'user',
    });
  });

  afterAll(resetUser);

  it('fields validation', async () => {
    const response = await request(app).post(`${ROUTES.USER.BASE}/login`);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toHaveProperty('username');
    expect(body.errors).toHaveProperty('password');
  });

  it('incorrect login: non-existent user', async () => {
    const response = await request(app)
      .post(`${ROUTES.USER.BASE}/login`)
      .send({ username: 'JohnDoe1', password: 'Password1!' });
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(body).toHaveProperty('error');
  });

  it('incorrect login: invalid passowrd', async () => {
    const response = await request(app)
      .post(`${ROUTES.USER.BASE}/login`)
      .send({ username: 'Maximus1', password: 'Password2!' });
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(body).toHaveProperty('error');
  });

  it('correct login', async () => {
    const response = await request(app)
      .post(`${ROUTES.USER.BASE}/login`)
      .send({ username: 'Maximus1', password: 'Password3!' });
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.OK);
    expect(body).toHaveProperty('token');
  });
});
