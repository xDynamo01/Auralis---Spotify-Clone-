import { isProduction } from '../config/env.js';

export function notFoundHandler(_req, _res, next) {
  const error = new Error('Route not found.');
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || error.response?.status || 500;
  const safeMessage = statusCode === 500 ? 'Internal server error.' : error.message;

  if (statusCode >= 500) {
    console.error(error.message);
  }

  res.status(statusCode).json({
    error: {
      message: safeMessage,
      statusCode,
      details: isProduction ? undefined : error.details
    }
  });
}
