import * as dotenv from 'dotenv';
import { Router } from 'express';
import { verifyToken } from 'api/middleware/user';
import cakeFlavourRules from 'api/validators/cakeFlavour';
import { checkRequired } from 'api/middleware/common';
import cakeFlavourController from 'api/controllers/cakeFlavour';
import { checkDuplicateValue, checkResourceExistance } from 'api/middleware/cakeFlavour';

dotenv.config();

const cakeFlavourRouter = Router();

cakeFlavourRouter.get(
  '/',
  cakeFlavourRules.getAll,
  [verifyToken, checkRequired],
  cakeFlavourController.getAllFlavours,
);

cakeFlavourRouter.get(
  '/:id',
  cakeFlavourRules.getSingle,
  [verifyToken, checkRequired],
  cakeFlavourController.getFlavour,
);

cakeFlavourRouter.put(
  '/:id',
  cakeFlavourRules.updateSingle,
  [verifyToken, checkRequired, checkResourceExistance],
  cakeFlavourController.putFlavour,
);

cakeFlavourRouter.post(
  '/',
  cakeFlavourRules.addSingle,
  [verifyToken, checkRequired, checkDuplicateValue],
  cakeFlavourController.postFlavour,
);

cakeFlavourRouter.delete(
  '/:id',
  cakeFlavourRules.getSingle,
  [verifyToken, checkRequired, checkResourceExistance],
  cakeFlavourController.deleteFlavour,
);

export default cakeFlavourRouter;
