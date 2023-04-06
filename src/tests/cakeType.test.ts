/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { resetCakeType } from 'db/services/cakeType';
import { NextFunction, Request, Response } from 'express';

const EXAMPLE_PAYLOAD = {
  name: 'test name',
  value: 'test value',
  accessible: true,
  customizable: true,
};

jest.mock('api/middleware/auth', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('testing cake type routes', () => {
  beforeEach(async () => {
    await resetCakeType();
    jest.clearAllMocks();
  });

  it('add cake type - invalid request', async () => {
    const response = await request(app).post('/api/cake-type').send();
    const { status, body } = response;
    expect(status).toBe(422);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { error: 'Nieprawidłowa wartość', name: 'name' },
        { error: 'Nieprawidłowa wartość', name: 'value' },
        { error: 'Nieprawidłowa wartość', name: 'accessible' },
        { error: 'Nieprawidłowa wartość', name: 'customizable' },
      ]),
    );
  });

  it('add cake type - valid request', async () => {
    const response = await request(app).post('/api/cake-type').send(EXAMPLE_PAYLOAD);

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('name', 'test name');
    expect(body).toHaveProperty('value', 'test value');
    expect(body).toHaveProperty('accessible', true);
    expect(body).toHaveProperty('customizable', true);
    expect(body).toHaveProperty('description', null);
  });

  it('single get cake type - invalid request', async () => {
    const response = await request(app).get('/api/cake-type/g');

    const { status, body } = response;
    expect(status).toBe(422);
    expect(body.errors).toEqual(
      expect.arrayContaining([{ error: 'Nieprawidłowa wartość', name: 'id' }]),
    );
  });

  it('single get cake type - valid request', async () => {
    const {
      body: { id },
    } = await request(app).post('/api/cake-type').send(EXAMPLE_PAYLOAD);
    const response = await request(app).get(`/api/cake-type/${id}`);

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('name', 'test name');
    expect(body).toHaveProperty('value', 'test value');
    expect(body).toHaveProperty('accessible', true);
    expect(body).toHaveProperty('customizable', true);
    expect(body).toHaveProperty('description', null);
  });

  it('get cake type - valid request', async () => {
    const response = await request(app).get(`/api/cake-type`);

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it('update cake type - invalid request', async () => {
    const response = await request(app).put(`/api/cake-type/1`).send();

    const { status, body } = response;
    expect(status).toBe(422);
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { error: 'Nieprawidłowa wartość', name: 'name' },
        { error: 'Nieprawidłowa wartość', name: 'accessible' },
        { error: 'Nieprawidłowa wartość', name: 'customizable' },
      ]),
    );
  });

  it('update cake type - valid request', async () => {
    const {
      body: { id },
    } = await request(app).post('/api/cake-type').send(EXAMPLE_PAYLOAD);
    const response = await request(app).put(`/api/cake-type/${id}`).send({
      name: 'test name1',
      accessible: false,
      customizable: false,
      description: '123',
    });

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('name', 'test name1');
    expect(body).toHaveProperty('value', 'test value');
    expect(body).toHaveProperty('accessible', false);
    expect(body).toHaveProperty('customizable', false);
    expect(body).toHaveProperty('description', '123');
  });

  it('delete cake type - invalid request', async () => {
    const response = await request(app).delete('/api/cake-type/g');

    const { status, body } = response;
    expect(status).toBe(422);
    expect(body.errors).toEqual(
      expect.arrayContaining([{ error: 'Nieprawidłowa wartość', name: 'id' }]),
    );
  });

  it('delete cake type - invalid request', async () => {
    const response = await request(app).delete('/api/cake-type/g');

    const { status, body } = response;
    expect(status).toBe(422);
    expect(body.errors).toEqual(
      expect.arrayContaining([{ error: 'Nieprawidłowa wartość', name: 'id' }]),
    );
  });

  it('delete cake type - valid request', async () => {
    const {
      body: { id },
    } = await request(app).post('/api/cake-type').send(EXAMPLE_PAYLOAD);
    const response = await request(app).delete(`/api/cake-type/${id}`);

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('name', 'test name');
    expect(body).toHaveProperty('value', 'test value');
    expect(body).toHaveProperty('accessible', true);
    expect(body).toHaveProperty('customizable', true);
  });
});
