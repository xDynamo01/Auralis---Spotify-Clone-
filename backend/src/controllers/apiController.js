import { spotifyRequest } from '../services/spotifyService.js';
import { validateSearchQuery, validateSpotifyId } from '../utils/validation.js';

function mapTrack(track) {
  return {
    id: track.id,
    name: track.name,
    artists: track.artists?.map((artist) => artist.name) || [],
    album: track.album?.name,
    image: track.album?.images?.[0]?.url || null,
    durationMs: track.duration_ms,
    previewUrl: track.preview_url,
    externalUrl: track.external_urls?.spotify || null
  };
}

function mapPlaylist(playlist) {
  return {
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    image: playlist.images?.[0]?.url || null,
    tracksTotal: playlist.tracks?.total || 0,
    owner: playlist.owner?.display_name,
    externalUrl: playlist.external_urls?.spotify || null
  };
}

export async function profile(req, res) {
  const data = await spotifyRequest(req.auth.sessionId, req.auth.session, {
    method: 'GET',
    url: '/me'
  });

  res.json({
    id: data.id,
    displayName: data.display_name,
    email: data.email,
    image: data.images?.[0]?.url || null,
    followers: data.followers?.total || 0,
    country: data.country,
    product: data.product
  });
}

export async function playlists(req, res) {
  const data = await spotifyRequest(req.auth.sessionId, req.auth.session, {
    method: 'GET',
    url: '/me/playlists',
    params: { limit: 20, offset: 0 }
  });

  res.json({
    items: data.items.map(mapPlaylist),
    total: data.total
  });
}

export async function playlistById(req, res) {
  const id = validateSpotifyId(req.params.id, 'Playlist id');
  const data = await spotifyRequest(req.auth.sessionId, req.auth.session, {
    method: 'GET',
    url: `/playlists/${id}`,
    params: {
      fields:
        'id,name,description,images,owner(display_name),external_urls,tracks(total,items(track(id,name,artists(name),album(name,images),duration_ms,preview_url,external_urls)))'
    }
  });

  res.json({
    ...mapPlaylist(data),
    tracks: data.tracks.items
      .map((item) => item.track)
      .filter(Boolean)
      .map(mapTrack)
  });
}

export async function topTracks(req, res) {
  const data = await spotifyRequest(req.auth.sessionId, req.auth.session, {
    method: 'GET',
    url: '/me/top/tracks',
    params: { limit: 20, time_range: 'medium_term' }
  });

  res.json({
    items: data.items.map(mapTrack),
    total: data.total
  });
}

export async function search(req, res) {
  const query = validateSearchQuery(req.query.q);
  const data = await spotifyRequest(req.auth.sessionId, req.auth.session, {
    method: 'GET',
    url: '/search',
    params: {
      q: query,
      type: 'track,artist,playlist',
      limit: 8
    }
  });

  res.json({
    tracks: data.tracks?.items.map(mapTrack) || [],
    artists:
      data.artists?.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images?.[0]?.url || null,
        followers: artist.followers?.total || 0,
        externalUrl: artist.external_urls?.spotify || null
      })) || [],
    playlists: data.playlists?.items.filter(Boolean).map(mapPlaylist) || []
  });
}

export async function recentlyPlayed(req, res) {
  const data = await spotifyRequest(req.auth.sessionId, req.auth.session, {
    method: 'GET',
    url: '/me/player/recently-played',
    params: { limit: 20 }
  });

  res.json({
    items: data.items.map((item) => ({
      playedAt: item.played_at,
      track: mapTrack(item.track)
    }))
  });
}
