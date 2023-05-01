import { Result, ValidationError } from 'express-validator';

export const requestError = (status: number, message?: string) => ({
  error: message || 'błąd zapytania',
});

export const fieldsError = (status: number, fields: Result<ValidationError>) => {
  const mappedErrors: { [key: string]: any } = { errors: {} };
  fields.array({ onlyFirstError: true }).forEach(({ msg, param }) => {
    mappedErrors.errors[param] = msg;
  });

  return mappedErrors;
};

export const serverError = (message?: string) => ({
  error: message || 'błąd serwera',
});

export const singleFieldError = (key: string, msg?: string) => ({ errors: { [key]: msg } });
