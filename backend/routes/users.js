import {Router} from 'express';import {profile,updateProfile,publicProfile} from '../controllers/userController.js';import {protect} from '../middleware/auth.js';import {asyncHandler} from '../utils/asyncHandler.js';
const r=Router();r.use(protect);r.get('/profile',asyncHandler(profile));r.put('/profile',asyncHandler(updateProfile));r.get('/:id',asyncHandler(publicProfile));export default r;
