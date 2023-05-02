import { check } from 'express-validator';

export const PASSWORD_RULE = check('password')
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .withMessage(
    'Nieprawidłowa wartość, hasło musi zawierać conajmniej 8 znaków, 1 dużą literę, 1 cyfrę oraz 1 znak specjalny',
  );

export const USERNAME_RULE = check('username').isString().withMessage('Nieprawidłowa wartość');
