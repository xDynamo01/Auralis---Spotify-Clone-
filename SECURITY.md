# Security Policy

## Local secrets

Never commit `.env` files. Use `backend/.env.example` and `frontend/.env.example` as templates.

Backend variables:

```env
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=http://localhost:5000/auth/callback
FRONTEND_URL=http://localhost:5173
COOKIE_SECRET=
```

Frontend variables:

```env
VITE_API_URL=http://localhost:5000
```

## OAuth and cookies

- The Spotify client secret is used only by the backend.
- The frontend never receives Spotify access or refresh tokens.
- Auralis stores a signed HTTPOnly session cookie in the browser and keeps Spotify tokens server-side.
- The OAuth `state` parameter is validated with a signed short-lived HTTPOnly cookie to reduce CSRF risk.
- Refresh token rotation is supported when Spotify returns a new refresh token.

## Running locally

1. Create a Spotify app at the Spotify Developer Dashboard.
2. Add `http://localhost:5000/auth/callback` as an allowed redirect URI.
3. Copy both `.env.example` files to `.env` and fill the values.
4. Start backend and frontend in separate terminals.

Report vulnerabilities privately before opening public issues.
