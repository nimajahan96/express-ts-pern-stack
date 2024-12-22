export interface CustomError extends Error {
  status?: number;
  code?: number;
}

export interface ErrorResponseData {
  status: number;
  devMessage: string;
  productMessage: string;
}

export interface CustomFields {
  [key: string]: unknown;
}
