import express from 'express';
import {createCourse,getCourses,getCourseById, uploadPdf} from '../controllers/courseController.js'
import {protect,admin} from '../middleware/authMiddleware.js' 



const router = express.Router()

router.route('/').get(getCourses)
router.route('/create').post(protect,admin,createCourse) 
router.route('/uploadPdf/:id').put(uploadPdf)
router.route('/:id').get(getCourseById)


  
export default router 