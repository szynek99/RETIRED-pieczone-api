import { Result, ValidationError } from 'express-validator';

export const requestError = (status: number, message?: string) => {
  return {
    status,
    error: message || 'request error',
  };
};

export const fieldsError = (status: number, fields: Result<ValidationError>) => {
  const fieldsError = fields.array().map((entry) => {
    return { name: entry.param, error: entry.msg };
  });

  return {
    status,
    errors: fieldsError,
  };
};
