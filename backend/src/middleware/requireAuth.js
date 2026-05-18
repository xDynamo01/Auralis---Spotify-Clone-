import { getSessionCookie } from './cookies.js';
import { getSession } from '../services/sessionStore.js';
import { createHttpError } from '../utils/httpError.js';

export function requireAuth(req, _res, next) {
  const sessionId = getSessionCookie(req);
  const session = sessionId ? getSession(sessionId) : null;

  if (!sessionId || !session) {
    next(createHttpError(401, 'Not authorized.'));
    return;
  }

  req.auth = { sessionId, session };
  next();
}
