import { Result, ValidationError } from 'express-validator';

export const requestError = (status: number, message?: string) => ({
  status,
  error: message || 'request error',
});

export const fieldsError = (status: number, fields: Result<ValidationError>) => {
  const errors = fields.array().map((entry) => ({ name: entry.param, error: entry.msg }));

  return {
    status,
    errors,
  };
};
export const serverError = (status: number, message?: string) => ({
  status,
  error: message || 'server error',
});
