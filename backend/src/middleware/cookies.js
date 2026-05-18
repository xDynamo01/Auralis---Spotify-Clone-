import { isProduction } from '../config/env.js';

const SESSION_COOKIE = 'auralis_session';
const STATE_COOKIE = 'auralis_oauth_state';

const baseOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: isProduction,
  signed: true
};

export function setSessionCookie(res, sessionId) {
  res.cookie(SESSION_COOKIE, sessionId, {
    ...baseOptions,
    maxAge: 1000 * 60 * 60 * 24 * 14
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(SESSION_COOKIE, baseOptions);
}

export function getSessionCookie(req) {
  return req.signedCookies?.[SESSION_COOKIE];
}

export function setStateCookie(res, state) {
  res.cookie(STATE_COOKIE, state, {
    ...baseOptions,
    maxAge: 1000 * 60 * 10
  });
}

export function clearStateCookie(res) {
  res.clearCookie(STATE_COOKIE, baseOptions);
}

export function getStateCookie(req) {
  return req.signedCookies?.[STATE_COOKIE];
}
