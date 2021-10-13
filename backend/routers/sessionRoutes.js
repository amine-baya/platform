import express from 'express';
import {createSession,getSessions, updateAndGetSessionById,getSessionById} from '../controllers/sessionController.js'
import {protect,admin} from '../middleware/authMiddleware.js' 



const router = express.Router()

router.route('/').get(getSessions)
//router.route('/users').get(getUsers)
router.route('/create').post(protect,admin,createSession)
router.route('/:id').put(protect,admin,updateAndGetSessionById).get(getSessionById)  
 
export default router   