import { env } from '../config/env.js';
import {
  clearSessionCookie,
  clearStateCookie,
  getSessionCookie,
  getStateCookie,
  setSessionCookie,
  setStateCookie
} from '../middleware/cookies.js';
import { buildAuthorizeUrl, exchangeCodeForTokens, spotifyRequest } from '../services/spotifyService.js';
import { createSession, deleteSession, getSession } from '../services/sessionStore.js';
import { createRandomToken } from '../utils/crypto.js';
import { createHttpError } from '../utils/httpError.js';

export function login(_req, res) {
  const state = createRandomToken(24);
  setStateCookie(res, state);
  res.redirect(buildAuthorizeUrl(state));
}

export async function callback(req, res) {
  const { code, state, error } = req.query;
  const expectedState = getStateCookie(req);

  clearStateCookie(res);

  if (error) {
    res.redirect(`${env.frontendUrl}/not-authorized`);
    return;
  }

  if (!code || !state || !expectedState || state !== expectedState) {
    throw createHttpError(400, 'Invalid OAuth state.');
  }

  const tokens = await exchangeCodeForTokens(String(code));
  const sessionId = createRandomToken(32);

  createSession(sessionId, tokens);
  setSessionCookie(res, sessionId);
  res.redirect(env.frontendUrl);
}

export function logout(req, res) {
  const sessionId = getSessionCookie(req);

  if (sessionId) {
    deleteSession(sessionId);
  }

  clearSessionCookie(res);
  res.status(204).send();
}

export async function me(req, res) {
  const sessionId = getSessionCookie(req);
  const session = sessionId ? getSession(sessionId) : null;

  if (!sessionId || !session) {
    res.json({ authenticated: false, user: null });
    return;
  }

  const user = await spotifyRequest(sessionId, session, {
    method: 'GET',
    url: '/me'
  });

  res.json({
    authenticated: true,
    user: {
      id: user.id,
      displayName: user.display_name,
      email: user.email,
      image: user.images?.[0]?.url || null,
      country: user.country,
      product: user.product
    }
  });
}
