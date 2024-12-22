import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/app';

const globalErrorHandlingMiddleware = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('err stack : ', err.stack);
  }

  let statusCode = err.status || 500;
  let message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
    }),
  });
};

export default globalErrorHandlingMiddleware;