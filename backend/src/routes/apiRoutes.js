import { Router } from 'express';
import {
  playlistById,
  playlists,
  profile,
  recentlyPlayed,
  search,
  topTracks
} from '../controllers/apiController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const apiRouter = Router();

apiRouter.use(requireAuth);
apiRouter.get('/profile', asyncHandler(profile));
apiRouter.get('/playlists', asyncHandler(playlists));
apiRouter.get('/playlists/:id', asyncHandler(playlistById));
apiRouter.get('/top-tracks', asyncHandler(topTracks));
apiRouter.get('/search', asyncHandler(search));
apiRouter.get('/player/recently-played', asyncHandler(recentlyPlayed));
