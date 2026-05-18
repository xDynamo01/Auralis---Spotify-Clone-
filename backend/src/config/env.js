import dotenv from 'dotenv';

dotenv.config();

const requiredInProduction = [
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
  'SPOTIFY_REDIRECT_URI',
  'FRONTEND_URL',
  'COOKIE_SECRET'
];

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:5000/auth/callback',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  cookieSecret: process.env.COOKIE_SECRET || 'auralis-local-dev-cookie-secret-change-me'
};

export function assertEnv() {
  const missing = requiredInProduction.filter((key) => !process.env[key]);

  if (missing.length > 0 && env.nodeEnv === 'production') {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (missing.length > 0 && env.nodeEnv !== 'test') {
    console.warn(
      `Auralis backend running with missing optional development variables: ${missing.join(', ')}. Spotify login will require them.`
    );
  }
}

export const isProduction = env.nodeEnv === 'production';

export function hasSpotifyCredentials() {
  return Boolean(env.spotifyClientId && env.spotifyClientSecret && env.spotifyRedirectUri);
}
