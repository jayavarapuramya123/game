import {Router} from 'express';import * as c from '../controllers/leaderboardController.js';import {asyncHandler} from '../utils/asyncHandler.js';
const r=Router();r.get('/',asyncHandler(c.globalLeaderboard));r.get('/:gameId',asyncHandler(c.gameLeaderboard));export default r;
