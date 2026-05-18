import { demoPlaylists, demoProfile, demoTracks, demoUser } from './mockData.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const DEMO_KEY = 'auralis_demo_session';

function isDemoSession() {
  return window.localStorage.getItem(DEMO_KEY) === 'true';
}

function filterDemo(query) {
  const normalized = query.toLowerCase();
  const tracks = demoTracks.filter((track) => {
    return `${track.name} ${track.artists.join(' ')} ${track.album}`.toLowerCase().includes(normalized);
  });
  const playlists = demoPlaylists.filter((playlist) => {
    return `${playlist.name} ${playlist.description}`.toLowerCase().includes(normalized);
  });

  return {
    tracks: tracks.length ? tracks : demoTracks,
    artists: [
      {
        id: 'artist-demo-01',
        name: 'Auralis Signal',
        image: '/assets/Auralis-logo.png',
        followers: 3200,
        externalUrl: null
      }
    ],
    playlists: playlists.length ? playlists : demoPlaylists
  };
}

async function request(path, options = {}) {
  const { timeout = 4000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);

  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers || {})
    },
    ...fetchOptions
  }).finally(() => window.clearTimeout(timeoutId));

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error?.message || 'Request failed.');
    error.status = response.status;
    throw error;
  }

  return data;
}

export const api = {
  loginUrl: `${API_URL}/auth/login`,
  enableDemo: () => window.localStorage.setItem(DEMO_KEY, 'true'),
  me: () =>
    isDemoSession()
      ? Promise.resolve({ authenticated: true, user: demoUser })
      : request('/auth/me'),
  logout: () => {
    const wasDemo = isDemoSession();
    window.localStorage.removeItem(DEMO_KEY);
    return wasDemo ? Promise.resolve(null) : request('/auth/logout', { method: 'POST' });
  },
  profile: () => (isDemoSession() ? Promise.resolve(demoProfile) : request('/api/profile')),
  playlists: () =>
    isDemoSession()
      ? Promise.resolve({ items: demoPlaylists, total: demoPlaylists.length })
      : request('/api/playlists'),
  playlist: (id) =>
    isDemoSession()
      ? Promise.resolve(demoPlaylists.find((playlist) => playlist.id === id) || demoPlaylists[0])
      : request(`/api/playlists/${encodeURIComponent(id)}`),
  topTracks: () =>
    isDemoSession()
      ? Promise.resolve({ items: demoTracks, total: demoTracks.length })
      : request('/api/top-tracks'),
  search: (query) =>
    isDemoSession() ? Promise.resolve(filterDemo(query)) : request(`/api/search?q=${encodeURIComponent(query)}`),
  recentlyPlayed: () =>
    isDemoSession()
      ? Promise.resolve({ items: demoTracks.map((track) => ({ playedAt: new Date().toISOString(), track })) })
      : request('/api/player/recently-played')
};
