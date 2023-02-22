/* eslint-disable import/no-extraneous-dependencies */
import sinon from 'sinon';
import rewire from 'rewire';
import * as chai from 'chai';
import request from 'supertest';
import sinonChai from 'sinon-chai';
import { HttpStatusCode } from 'constants/common';
import { NextFunction, Response, Request } from 'express';

chai.use(sinonChai);
const { expect } = chai;

const authController = rewire('../api/controllers/auth');
const authMiddleware = rewire('../api/middleware/auth');
const sandbox = sinon.createSandbox();

describe('Testing auth routes', () => {
  let app: any;
  describe('Testing /signup route', () => {
    beforeEach(() => {
      sandbox.stub(authController, 'signUp').resolves('user created successfully');
      sandbox
        .stub(authMiddleware, 'checkDuplicateUsername')
        .callsFake(async (_req: Request, _res: Response, next: NextFunction) => next());
      app = rewire('../app');
    });

    it('User successful creation', (done) => {
      request(app)
        .post('/api/auth/signup')
        .send({ username: 'John', password: 'password', role: 'Admin' })
        .expect(HttpStatusCode.OK)
        .end((err, res) => {
          expect(res.body).to.equal('user created successfully');
          done(err);
        });
    });
  });
});
