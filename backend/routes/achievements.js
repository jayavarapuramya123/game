import {Router} from 'express';import * as c from '../controllers/achievementController.js';import {protect} from '../middleware/auth.js';import {asyncHandler} from '../utils/asyncHandler.js';
const r=Router();r.get('/',asyncHandler(c.allAchievements));r.get('/my-achievements',protect,asyncHandler(c.myAchievements));export default r;
