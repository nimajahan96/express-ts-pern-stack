import { Response } from 'express';
import { CustomFields, ErrorResponseData } from '../../types/app';

const isDevelopment = process.env.NODE_ENV === 'development';

export const generateErrorResponse = (
  res: Response,
  err: any,
  data: Partial<ErrorResponseData> = {},
  customFields: CustomFields = {}
): Response => {
  const { status = 500, devMessage = 'An error occurred', productMessage = 'An error occurred' } = data;

  return res.status(status).json({
    success: false,
    message: isDevelopment ? devMessage : productMessage,
    ...(isDevelopment && { errors: err?.errors, stack: err?.stack }),
    ...customFields,
  });
};
