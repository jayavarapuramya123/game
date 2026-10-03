import {Router} from 'express';import * as c from '../controllers/resultController.js';import {protect} from '../middleware/auth.js';import {asyncHandler} from '../utils/asyncHandler.js';
const r=Router();r.use(protect);r.post('/',asyncHandler(c.submitResult));r.get('/my-results',asyncHandler(c.myResults));r.get('/game/:gameId',asyncHandler(c.gameResults));export default r;
