import { PrismaClientKnownRequestError, PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { QueryError } from "../config/prismaErrorCode";
import { NextFunction, Request, Response } from "express";
import { generateErrorResponse } from "../lib/utils/utils";

const prismaErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof PrismaClientKnownRequestError) {
    const errorResponse = QueryError.get(err.code) || {
      message: "An unknown error occurred with the database.",
      httpStatus: 500,
    };

    return generateErrorResponse(res, err, {
      status: errorResponse.httpStatus,
      devMessage: `Database error: ${errorResponse.message}`,
      productMessage: errorResponse.message,
    });
  }

  if (err instanceof PrismaClientUnknownRequestError) {
    return generateErrorResponse(res, err, {
      status: 500,
      devMessage: `Unknown request error: ${err.message}`,
      productMessage: "An unknown error occurred",
    });
  }

  if (err instanceof PrismaClientRustPanicError) {
    return generateErrorResponse(res, err, {
      status: 500,
      devMessage: `Prisma panic: ${err.message}`,
      productMessage:
        "A critical error occurred in the Prisma query engine. Please restart the process.",
    });
  }

  if (err instanceof PrismaClientInitializationError) {
    return generateErrorResponse(res, err, {
      status: 500,
      devMessage: `Prisma initialization error: ${err.message}`,
      productMessage:
        "Failed to initialize Prisma Client. Please check your database connection settings.",
    });
  }

  if (err && typeof err === "object" && "code" in err && QueryError.has((err as any).code)) {
    const errorResponse = QueryError.get((err as any).code) || {
      message: "An unknown error occurred with the database.",
      httpStatus: 500,
    };

    return generateErrorResponse(res, err, {
      status: errorResponse.httpStatus,
      devMessage: `Database error: ${errorResponse.message}`,
      productMessage: errorResponse.message,
    });
  }

  next(err);
};

export default prismaErrorHandler;
