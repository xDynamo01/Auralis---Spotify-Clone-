import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { apiLimiter, authLimiter } from './middleware/rateLimiters.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { apiRouter } from './routes/apiRoutes.js';
import { authRouter } from './routes/authRoutes.js';

const allowedOrigins = new Set([
  env.frontendUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
]);

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false
    })
  );
  app.use(express.json({ limit: '50kb' }));
  app.use(cookieParser(env.cookieSecret));
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error('Origin not allowed by CORS.'));
      },
      credentials: true
    })
  );

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'auralis-backend' });
  });

  app.use('/auth', authLimiter, authRouter);
  app.use('/api', apiLimiter, apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
