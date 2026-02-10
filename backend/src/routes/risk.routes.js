import express from 'express';
import { addRisk, getRisk } from '../controllers/risk.controller.js';


const router=express.Router();

router.post('/assess-risk',addRisk);
router.get('/risks',getRisk)

export {router}