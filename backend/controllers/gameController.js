import Game from '../models/Game.js'; import {ok} from '../utils/respond.js';
export async function listGames(req,res){const filter=req.user?.role==='admin'?{}:{status:'active'};return ok(res,{games:await Game.find(filter).sort({plays:-1,createdAt:-1})});}
export async function getGame(req,res){const game=await Game.findById(req.params.id);if(!game||game.status==='disabled'&&req.user?.role!=='admin')return res.status(404).json({success:false,message:'Game not found',errors:[]});return ok(res,{game});}
export async function createGame(req,res){const game=await Game.create(req.body);return ok(res,{game},'Game created',201);}
export async function updateGame(req,res){const game=await Game.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!game)return res.status(404).json({success:false,message:'Game not found',errors:[]});return ok(res,{game},'Game updated');}
export async function deleteGame(req,res){const game=await Game.findByIdAndDelete(req.params.id);if(!game)return res.status(404).json({success:false,message:'Game not found',errors:[]});return ok(res,{},'Game deleted');}
