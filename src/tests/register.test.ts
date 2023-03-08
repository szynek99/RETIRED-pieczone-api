/* eslint-disable import/no-extraneous-dependencies */

import server from 'app';
import request from 'supertest';
import { ROUTES } from 'constants/routes';
import { resetUser } from 'db/services/auth';
import { HttpStatusCode } from 'constants/common';

describe('user/register', () => {
  beforeEach(resetUser);

  it('check required fields', async () => {
    await import('db/models/user');

    const response = await request(server).get(ROUTES.AUTH.BASE + ROUTES.AUTH.REGISTER);
    const { status, body } = response;
    expect(status).toBe(HttpStatusCode.UNPROCESSABLE);
  });
});
