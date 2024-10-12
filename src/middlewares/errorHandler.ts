import { Request, Response } from 'express';
import { errorMessages, HttpStatusCode } from '../utils/constants';

interface CustomError {
  message: string;
  statusCode: HttpStatusCode;
  details?: string;
}

const createError = (message: string, statusCode: HttpStatusCode, details?: string): CustomError => ({
  message,
  statusCode,
  details,
});

export const errorHandler = (error: CustomError, _: Request, res: Response): void => {
  const statusCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = error.message || errorMessages.default;

  res.status(statusCode).json({
    error: {
      message: message,
      details: error.details,
    },
  });
};

export const createValidationError = (message: string): CustomError => {
  return createError(message, HttpStatusCode.BAD_REQUEST);
};

export const createInsufficientBalanceError = (): CustomError => {
  return createError(errorMessages.insufficientBalance, HttpStatusCode.BAD_REQUEST);
};

export const createUnexpectedError = (details?: string): CustomError => {
  return createError(errorMessages.default, HttpStatusCode.INTERNAL_SERVER_ERROR, details);
};
