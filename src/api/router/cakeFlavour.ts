import * as dotenv from 'dotenv';
import { Router } from 'express';
import { checkRequired } from 'api/middleware/common';
import cakeFlavourRules from 'api/validators/cakeFlavour';
import { isAdmin, verifyToken } from 'api/middleware/user';
import cakeFlavourController from 'api/controllers/cakeFlavour';
import { checkDuplicateValue, checkResourceExistance } from 'api/middleware/cakeFlavour';

dotenv.config();

const cakeFlavourRouter = Router();

cakeFlavourRouter.get(
  '/',
  cakeFlavourRules.getAll,
  [verifyToken, isAdmin, checkRequired],
  cakeFlavourController.getAllFlavours,
);

cakeFlavourRouter.get(
  '/:id',
  cakeFlavourRules.getSingle,
  [verifyToken, isAdmin, checkRequired],
  cakeFlavourController.getFlavour,
);

cakeFlavourRouter.put(
  '/:id',
  cakeFlavourRules.updateSingle,
  [verifyToken, isAdmin, checkRequired, checkResourceExistance],
  cakeFlavourController.putFlavour,
);

cakeFlavourRouter.post(
  '/',
  cakeFlavourRules.addSingle,
  [verifyToken, isAdmin, checkRequired, checkDuplicateValue],
  cakeFlavourController.postFlavour,
);

cakeFlavourRouter.delete(
  '/:id',
  cakeFlavourRules.getSingle,
  [verifyToken, checkRequired, checkResourceExistance],
  cakeFlavourController.deleteFlavour,
);

export default cakeFlavourRouter;
