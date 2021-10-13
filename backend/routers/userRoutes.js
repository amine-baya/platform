import express from 'express';
import {authUser, registerUser,getUsers,getUserProfile, updateUserProfile, updateUserProfileSignature, updatePresence,updatePresenceById} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js' 



const router = express.Router()

router.route('/').post(protect,admin,registerUser).get(protect,getUsers) 
router.post('/login', authUser) 
router.route('/profile').get(protect , getUserProfile).put(protect, updateUserProfile)
router.route('/profile/signature').put(protect, updateUserProfileSignature)
router.route('/presence').put(protect, updatePresence)
router.route('/presenceAll').put(protect, updatePresenceById)







 
export default router   