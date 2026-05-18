const sessions = new Map();

function cloneSession(session) {
  return session ? { ...session } : null;
}

export function createSession(sessionId, tokenPayload) {
  sessions.set(sessionId, {
    accessToken: tokenPayload.access_token,
    refreshToken: tokenPayload.refresh_token,
    expiresAt: Date.now() + tokenPayload.expires_in * 1000,
    scope: tokenPayload.scope,
    tokenType: tokenPayload.token_type
  });
}

export function getSession(sessionId) {
  return cloneSession(sessions.get(sessionId));
}

export function updateSession(sessionId, updates) {
  const current = sessions.get(sessionId);

  if (!current) {
    return null;
  }

  const next = { ...current, ...updates };
  sessions.set(sessionId, next);
  return cloneSession(next);
}

export function deleteSession(sessionId) {
  sessions.delete(sessionId);
}
