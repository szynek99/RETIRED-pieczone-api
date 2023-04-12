/* eslint-disable import/no-extraneous-dependencies */
import app from 'api/app';
import request from 'supertest';
import { NextFunction, Request, Response } from 'express';
import { resetCakeFlavour } from 'db/services/cakeFlavour';

const EXAMPLE_PAYLOAD = {
  name: 'test name',
  value: 'test value',
  accessible: true,
};

jest.mock('api/middleware/auth', () => ({
  verifyToken: (_: Request, __: Response, next: NextFunction) => next(),
  checkDuplicateUsername: (_: Request, __: Response, next: NextFunction) => next(),
}));

describe('testing cake flavour routes', () => {
  beforeEach(async () => {
    await resetCakeFlavour();
    jest.clearAllMocks();
  });

  it('add cake flavour - invalid request', async () => {
    const response = await request(app).post('/api/cake-flavour').send();
    const { status, body } = response;
    expect(status).toBe(422);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { error: 'Nieprawidłowa wartość', name: 'name' },
        { error: 'Nieprawidłowa wartość', name: 'value' },
        { error: 'Nieprawidłowa wartość', name: 'accessible' },
      ]),
    );
  });

  it('add cake flavour - valid request', async () => {
    const response = await request(app).post('/api/cake-flavour').send(EXAMPLE_PAYLOAD);

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('name', 'test name');
    expect(body).toHaveProperty('value', 'test value');
    expect(body).toHaveProperty('accessible', true);
  });

  it('single get cake flavour - invalid request', async () => {
    const response = await request(app).get('/api/cake-flavour/g');

    const { status, body } = response;
    expect(status).toBe(422);
    expect(body.errors).toEqual(
      expect.arrayContaining([{ error: 'Nieprawidłowa wartość', name: 'id' }]),
    );
  });

  it('single get cake flavour - valid request', async () => {
    const {
      body: { id },
    } = await request(app).post('/api/cake-flavour').send(EXAMPLE_PAYLOAD);
    const response = await request(app).get(`/api/cake-flavour/${id}`);

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('name', 'test name');
    expect(body).toHaveProperty('value', 'test value');
    expect(body).toHaveProperty('accessible', true);
  });

  it('get cake flavour - valid request', async () => {
    const response = await request(app).get(`/api/cake-flavour`);

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it('update cake flavour - invalid request', async () => {
    const response = await request(app).put(`/api/cake-flavour/1`).send();

    const { status, body } = response;
    expect(status).toBe(422);
    expect(body.errors).toEqual(
      expect.arrayContaining([
        { error: 'Nieprawidłowa wartość', name: 'name' },
        { error: 'Nieprawidłowa wartość', name: 'accessible' },
      ]),
    );
  });

  it('update cake flavour - valid request', async () => {
    const {
      body: { id },
    } = await request(app).post('/api/cake-flavour').send(EXAMPLE_PAYLOAD);
    const response = await request(app).put(`/api/cake-flavour/${id}`).send({
      name: 'test name1',
      accessible: false,
    });

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('name', 'test name1');
    expect(body).toHaveProperty('value', 'test value');
    expect(body).toHaveProperty('accessible', false);
  });

  it('delete cake flavour - invalid request', async () => {
    const response = await request(app).delete('/api/cake-flavour/g');

    const { status, body } = response;
    expect(status).toBe(422);
    expect(body.errors).toEqual(
      expect.arrayContaining([{ error: 'Nieprawidłowa wartość', name: 'id' }]),
    );
  });

  it('delete cake flavour - invalid request', async () => {
    const response = await request(app).delete('/api/cake-flavour/g');

    const { status, body } = response;
    expect(status).toBe(422);
    expect(body.errors).toEqual(
      expect.arrayContaining([{ error: 'Nieprawidłowa wartość', name: 'id' }]),
    );
  });

  it('delete cake flavour - valid request', async () => {
    const {
      body: { id },
    } = await request(app).post('/api/cake-flavour').send(EXAMPLE_PAYLOAD);
    const response = await request(app).delete(`/api/cake-flavour/${id}`);

    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('name', 'test name');
    expect(body).toHaveProperty('value', 'test value');
    expect(body).toHaveProperty('accessible', true);
  });
});
