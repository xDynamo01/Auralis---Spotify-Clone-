import axios from 'axios';
import { env, hasSpotifyCredentials } from '../config/env.js';
import { SPOTIFY_ACCOUNTS_URL, SPOTIFY_API_URL, SPOTIFY_SCOPES } from '../config/spotify.js';
import { updateSession } from './sessionStore.js';
import { createHttpError } from '../utils/httpError.js';

function createBasicAuthHeader() {
  if (!hasSpotifyCredentials()) {
    throw createHttpError(503, 'Spotify credentials are not configured on the backend.');
  }

  const credentials = Buffer.from(`${env.spotifyClientId}:${env.spotifyClientSecret}`).toString('base64');
  return `Basic ${credentials}`;
}

export function buildAuthorizeUrl(state) {
  if (!hasSpotifyCredentials()) {
    throw createHttpError(503, 'Spotify credentials are not configured on the backend.');
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: env.spotifyClientId,
    scope: SPOTIFY_SCOPES.join(' '),
    redirect_uri: env.spotifyRedirectUri,
    state,
    show_dialog: 'false'
  });

  return `${SPOTIFY_ACCOUNTS_URL}/authorize?${params.toString()}`;
}

export async function exchangeCodeForTokens(code) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: env.spotifyRedirectUri
  });

  const { data } = await axios.post(`${SPOTIFY_ACCOUNTS_URL}/api/token`, body, {
    headers: {
      Authorization: createBasicAuthHeader(),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return data;
}

export async function refreshAccessToken(sessionId, session) {
  if (!session?.refreshToken) {
    throw createHttpError(401, 'Session expired.');
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: session.refreshToken
  });

  const { data } = await axios.post(`${SPOTIFY_ACCOUNTS_URL}/api/token`, body, {
    headers: {
      Authorization: createBasicAuthHeader(),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return updateSession(sessionId, {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || session.refreshToken,
    expiresAt: Date.now() + data.expires_in * 1000,
    scope: data.scope || session.scope,
    tokenType: data.token_type || session.tokenType
  });
}

async function getUsableSession(sessionId, session) {
  const expiresSoon = session.expiresAt - Date.now() < 60_000;
  return expiresSoon ? refreshAccessToken(sessionId, session) : session;
}

export async function spotifyRequest(sessionId, session, config) {
  const activeSession = await getUsableSession(sessionId, session);

  try {
    const { data } = await axios.request({
      baseURL: SPOTIFY_API_URL,
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: `Bearer ${activeSession.accessToken}`
      }
    });

    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      const refreshed = await refreshAccessToken(sessionId, activeSession);
      const { data } = await axios.request({
        baseURL: SPOTIFY_API_URL,
        ...config,
        headers: {
          ...(config.headers || {}),
          Authorization: `Bearer ${refreshed.accessToken}`
        }
      });

      return data;
    }

    const status = error.response?.status || 502;
    const message = error.response?.data?.error?.message || 'Spotify API request failed.';
    throw createHttpError(status, message);
  }
}
